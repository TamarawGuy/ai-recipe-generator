import { useState, useEffect, useCallback } from 'react'
import Navbar from '../../shared/Navbar'
import toast from 'react-hot-toast'
import { format, startOfWeek, addDays } from 'date-fns'

import api from '../../services/api'

import Loading from '../../shared/Loading'
import AddMealModal from './components/AddMealModal'

import type { MealType, MealPlan, Recipe } from '../../types.d'
import WeekDisplay from './components/WeekDisplay'
import Header from '../../shared/Header'
import WeekNavigation from './components/WeekNavigation'
import MealPlanStats from './components/MealPlanStats'
import MealPlanCalendarGrid from './components/MealPlanCalendarGrid'

const MealPlanner = () => {
    const [weekStart, setWeekStart] = useState(startOfWeek(new Date()))
    const [mealPlan, setMealPlan] = useState<
        Record<string, Partial<Record<MealType, MealPlan>>>
    >({})
    const [recipes, setRecipes] = useState<Recipe[]>([])
    const [showAddModal, setShowAddModal] = useState(false)
    const [selectedSlot, setSelectedSlot] = useState<{
        date: string
        mealType: MealType
    } | null>(null)
    const [loading, setLoading] = useState(true)

    const totalRecipesCount = recipes.length

    const fetchMealPlan = useCallback(async () => {
        try {
            const startDate = format(weekStart, 'yyyy-MM-dd')
            const endDate = format(addDays(weekStart, 6), 'yyyy-MM-dd')

            const resp = await api.get(
                `/meal-plans/weekly?start_date=${startDate}&end_date=${endDate}`,
            )
            const meals = resp.data.data.mealPlans as MealPlan[]

            // organize meals by date and meal type
            const organized: Record<
                string,
                Partial<Record<MealType, MealPlan>>
            > = {}
            meals.forEach((meal: MealPlan) => {
                const dateKey = meal.meal_date
                if (!organized[dateKey]) {
                    organized[dateKey] = {}
                }
                organized[dateKey][meal.meal_type] = meal
            })

            setMealPlan(organized)
        } catch (err) {
            console.error('Failed to load meal plan: ', err)
            toast.error('Failed to load meal plan')
        } finally {
            setLoading(false)
        }
    }, [weekStart])

    const fetchRecipes = async () => {
        try {
            const resp = await api.get('/recipes')
            setRecipes(resp.data.data.recipes)
        } catch {
            toast.error('Failed to load recipes')
        }
    }

    const onAddMeal = (date: string, mealType: MealType) => {
        setSelectedSlot({ date, mealType })
        setShowAddModal(true)
    }

    const onRemoveMeal = async (mealId: string) => {
        if (!confirm('Remove this meal from your plan?')) return

        try {
            await api.delete(`/meal-plans/${mealId}`)
            await fetchMealPlan()
            toast.success('Meal removed')
        } catch {
            toast.error('Failed to remove meal')
        }
    }

    useEffect(() => {
        fetchRecipes()
    }, [weekStart])

    useEffect(() => {
        fetchMealPlan()
    }, [fetchMealPlan])

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
                        fetchMealPlan()
                        setShowAddModal(false)
                        setSelectedSlot(null)
                    }}
                />
            )}
        </div>
    )
}
export default MealPlanner
