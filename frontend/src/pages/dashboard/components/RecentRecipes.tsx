import { Link } from 'react-router-dom'
import { ChefHat, Clock } from 'lucide-react'

import type { Recipe } from '../../../types'

type RecentRecipesProps = {
    recentRecipes: Recipe[]
}

const RecentRecipes = ({ recentRecipes }: RecentRecipesProps) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                    Recent Recipes
                </h2>
                <Link
                    to="/recipes"
                    className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                >
                    View All
                </Link>
            </div>

            {recentRecipes.length > 0 ? (
                <div className="space-y-3">
                    {recentRecipes.map((recipe) => (
                        <Link
                            key={recipe.id}
                            to={`/recipes/${recipe.id}`}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                                <ChefHat className="w-6 h-6 text-emerald-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-gray-900 truncate">
                                    {recipe.name}
                                </h3>
                                <p className="text-sm text-gray-500 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {recipe.cook_time} mins
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-center py-8">
                    No recipes yet. Generate your first one!
                </p>
            )}
        </div>
    )
}

export default RecentRecipes
