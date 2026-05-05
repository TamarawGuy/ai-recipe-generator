import { format, addDays } from 'date-fns'
import type { MealPlan, MealType } from '../../../types'

type MealPlanStatsProps = {
    mealPlan: Record<string, Partial<Record<MealType, MealPlan>>>
    totalRecipesCount: number
    weekStart: Date
}

const MealPlanStats = ({
    mealPlan,
    totalRecipesCount,
    weekStart,
}: MealPlanStatsProps) => {
    return (
        <ul className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 list-none">
            <li className="bg-white rounded-lg border border-gray-200 p-4">
                <p className="text-sm text-gray-600">Meals Planned</p>
                <p className="text-2xl font-bold text-gray-900">
                    {Object.values(mealPlan).reduce(
                        (acc, day) => acc + Object.keys(day).length,
                        0,
                    )}
                </p>
            </li>
            <li className="bg-white rounded-lg border border-gray-200 p-4">
                <p className="text-sm text-gray-600">Total Recipes</p>
                <p className="text-2xl font-bold text-gray-900">
                    {totalRecipesCount}
                </p>
            </li>
            <li className="bg-white rounded-lg border border-gray-200 p-4">
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-gray-900">
                    {format(weekStart, 'MMM d')} -{' '}
                    {format(addDays(weekStart, 6), 'MMM d')}
                </p>
            </li>
        </ul>
    )
}

export default MealPlanStats
