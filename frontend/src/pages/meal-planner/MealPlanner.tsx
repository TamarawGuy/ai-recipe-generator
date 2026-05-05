import { useState } from 'react'
import Navbar from '../../shared/Navbar'
import toast from 'react-hot-toast'
import { startOfWeek, addDays } from 'date-fns'

import api from '../../services/api'

import Loading from '../../shared/Loading'
import AddMealModal from './components/AddMealModal'
import WeekDisplay from './components/WeekDisplay'
import Header from '../../shared/Header'
import WeekNavigation from './components/WeekNavigation'
import MealPlanStats from './components/MealPlanStats'
import MealPlanCalendarGrid from './components/MealPlanCalendarGrid'

import { useMealPlan } from './hooks/useMealPlan'

import type { MealType } from '../../types.d'
import { useRecipes } from './hooks/useRecipes'

const MealPlanner = () => {
    const [weekStart, setWeekStart] = useState(startOfWeek(new Date()))
    const [showAddModal, setShowAddModal] = useState(false)
    const [selectedSlot, setSelectedSlot] = useState<{
        date: string
        mealType: MealType
    } | null>(null)
    const { mealPlan, loading, refetchMealPlan } = useMealPlan(weekStart)
    const { recipes } = useRecipes()

    const totalRecipesCount = recipes.length

    const onAddMeal = (date: string, mealType: MealType) => {
        setSelectedSlot({ date, mealType })
        setShowAddModal(true)
    }

    const onRemoveMeal = async (mealId: string) => {
        if (!confirm('Remove this meal from your plan?')) return

        try {
            await api.delete(`/meal-plans/${mealId}`)
            await refetchMealPlan()
            toast.success('Meal removed')
        } catch {
            toast.error('Failed to remove meal')
        }
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-between mb-6">
                    {/* Header */}
                    <Header
                        title="Meal Planner"
                        subtitle="Plan your weekly meals"
                    />

                    {/* Week Navigation */}
                    <WeekNavigation
                        onPrev={() => setWeekStart(addDays(weekStart, -7))}
                        onThisWeek={() => setWeekStart(startOfWeek(new Date()))}
                        onNext={() => setWeekStart(addDays(weekStart, 7))}
                    />
                </div>
                {/* Week Display */}
                <WeekDisplay weekStart={weekStart} />
                {/* Calendar Grid */}
                <MealPlanCalendarGrid
                    mealPlan={mealPlan}
                    weekStart={weekStart}
                    onAddMeal={onAddMeal}
                    onRemoveMeal={onRemoveMeal}
                />
                {/* Stats */}
                <MealPlanStats
                    mealPlan={mealPlan}
                    totalRecipesCount={totalRecipesCount}
                    weekStart={weekStart}
                />
            </div>

            {/* Add Meal Modal */}
            {showAddModal && selectedSlot && (
                <AddMealModal
                    date={selectedSlot.date}
                    mealType={selectedSlot.mealType}
                    recipes={recipes}
                    onClose={() => {
                        setShowAddModal(false)
                        setSelectedSlot(null)
                    }}
                    onSuccess={() => {
                        refetchMealPlan()
                        setShowAddModal(false)
                        setSelectedSlot(null)
                    }}
                />
            )}
        </div>
    )
}
export default MealPlanner
