import { Link } from 'react-router-dom'
import { ChefHat } from 'lucide-react'
import type { Recipe } from '../../../types'

const RecipesEmpty = ({ recipes }: { recipes: Recipe[] }) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">
                {recipes.length === 0
                    ? 'No recipes yet'
                    : 'No recipes match your filters'}
            </p>
            {recipes.length === 0 && (
                <Link
                    to="/generate"
                    className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
                >
                    Generate Your First Recipe
                </Link>
            )}
        </div>
    )
}

export default RecipesEmpty
