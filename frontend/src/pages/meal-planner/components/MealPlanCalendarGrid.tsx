import { Plus, X } from 'lucide-react'
import { format, addDays } from 'date-fns'

import type { MealPlan, MealType } from '../../../types'

const MEAL_TYPES: MealType[] = ['breakfast', 'lunch', 'dinner']
const DAYS_OF_WEEK = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
]

type MealPlanCalendarGridProps = {
    mealPlan: Record<string, Partial<Record<MealType, MealPlan>>>
    weekStart: Date
    onAddMeal: (date: string, mealType: MealType) => void
    onRemoveMeal: (mealId: string) => Promise<void>
}

const MealPlanCalendarGrid = ({
    mealPlan,
    weekStart,
    onAddMeal,
    onRemoveMeal,
}: MealPlanCalendarGridProps) => {
    const getDayMeals = (dayIndex: number) => {
        const date = format(addDays(weekStart, dayIndex), 'yyyy-MM-dd')
        return mealPlan[date] || {}
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Header Row */}
            <div className="grid grid-cols-8 border-b border-gray-200 bg-gray-50">
                <div className="p-4 font-semibold text-gray-700 border-r border-gray-200">
                    Meal
                </div>
                {DAYS_OF_WEEK.map((day, index) => (
                    <div
                        key={day}
                        className="p-4 text-center border-r border-gray-200 last:border-r-0"
                    >
                        <div className="font-semibold text-gray-900">{day}</div>
                        <div className="text-sm text-gray-500">
                            {format(addDays(weekStart, index), 'MMM d')}
                        </div>
                    </div>
                ))}
            </div>

            {/* Meal Rows */}
            {MEAL_TYPES.map((mealType) => (
                <div
                    key={mealType}
                    className="grid grid-cols-8 border-b border-gray-200 last:border-b-0"
                >
                    <div className="p-4 font-medium text-gray-700 capitalize border-r border-gray-200 bg-gray-50">
                        {mealType}
                    </div>
                    {DAYS_OF_WEEK.map((_, dayIndex) => {
                        const date = format(
                            addDays(weekStart, dayIndex),
                            'yyyy-MM-dd',
                        )
                        const dayMeals = getDayMeals(dayIndex)
                        const meal = dayMeals[mealType]

                        return (
                            <div
                                key={dayIndex}
                                className="p-3 border-r border-gray-200 last:border-r-0 min-h-[100px] hover:bg-gray-50 transition-colors"
                            >
                                {meal ? (
                                    <div className="relative group">
                                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                                            <p className="text-sm font-medium text-emerald-900 line-clamp-2">
                                                {meal.recipe_name}
                                            </p>
                                            <button
                                                onClick={() =>
                                                    onRemoveMeal(meal.id)
                                                }
                                                className="absolute top-1 right-1 p-1 bg-white rounded hover:bg-red-50 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() =>
                                            onAddMeal(date, mealType)
                                        }
                                        className="w-full h-full flex items-center justify-center text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors group"
                                    >
                                        <Plus className="w-6 h-6" />
                                    </button>
                                )}
                            </div>
                        )
                    })}
                </div>
            ))}
        </div>
    )
}

export default MealPlanCalendarGrid
