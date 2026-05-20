import { Link } from 'react-router-dom'

import { Calendar } from 'lucide-react'

import type { UpcomingMeal } from '../../../types'

type UpcomingMealsProps = {
    upcomingMeals: UpcomingMeal[]
}

const UpcomingMeals = ({ upcomingMeals }: UpcomingMealsProps) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                    Upcoming Meals
                </h2>
                <Link
                    to="/meal-plan"
                    className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                >
                    View calendar
                </Link>
            </div>

            {upcomingMeals.length > 0 ? (
                <div className="space-y-3">
                    {upcomingMeals.map((meal) => (
                        <div
                            key={meal.id}
                            className="flex items-center gap-3 p-3 rounded-lg border border-gray-100"
                        >
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-purple-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-gray-900 truncate">
                                    {meal.recipe_name}
                                </h3>
                                <p className="text-sm text-gray-500 capitalize">
                                    {meal.meal_type}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-center py-8">
                    No meals planned yet.
                </p>
            )}
        </div>
    )
}

export default UpcomingMeals
