import { Link } from 'react-router-dom'
import { ChefHat, Clock, Trash2 } from 'lucide-react'

import type { Recipe } from '../../../types.d'

type RecipeCardProps = {
    recipe: Recipe
    onDelete: (id: string) => void
}

const RecipeCard = ({ recipe, onDelete }: RecipeCardProps) => {
    const totalTime = (recipe.prep_time || 0) + (recipe.cook_time || 0)

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all group">
            {/* Recipe Image Placeholder */}
            <div className="h-48 bg-linear-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
                <ChefHat className="w-16 h-16 text-emerald-600" />
            </div>

            {/* Recipe Content */}
            <div className="p-5">
                <Link to={`/recipes/${recipe.id}`} className="block mb-3">
                    <h3 className="font-semibold text-lg text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2">
                        {recipe.name}
                    </h3>
                    {recipe.description && (
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {recipe.description}
                        </p>
                    )}
                </Link>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {recipe.cuisine_type && (
                        <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-medium">
                            {recipe.cuisine_type}
                        </span>
                    )}
                    {recipe.difficulty && (
                        <span
                            className={`px-2 py-1 rounded text-xs font-medium capitalize ${
                                recipe.difficulty === 'easy'
                                    ? 'bg-green-100 text-green-700'
                                    : recipe.difficulty === 'medium'
                                      ? 'bg-yellow-100 text-yellow-700'
                                      : 'bg-red-100 text-red-700'
                            }`}
                        >
                            {recipe.difficulty}
                        </span>
                    )}
                    {recipe.dietary_tags &&
                        recipe.dietary_tags.slice(0, 2).map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium"
                            >
                                {tag}
                            </span>
                        ))}
                </div>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{totalTime} mins</span>
                    </div>
                    {recipe.calories && <span>{recipe.calories} cal</span>}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-gray-100">
                    <Link
                        to={`/recipes/${recipe.id}`}
                        className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-center py-2 rounded-lg font-medium transition-colors text-sm"
                    >
                        View Recipe
                    </Link>
                    <button
                        onClick={() => onDelete(recipe.id)}
                        className="px-3 py-2 border border-gray-300 text-gray-700 hover:bg-red-50 hover:border-red-300 hover:text-red-600 rounded-lg transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}
export default RecipeCard
