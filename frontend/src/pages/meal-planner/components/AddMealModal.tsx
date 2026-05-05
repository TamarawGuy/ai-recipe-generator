import { useState, type SubmitEvent } from 'react'
import toast from 'react-hot-toast'
import { ChefHat, X } from 'lucide-react'
import { format } from 'date-fns'

import api from '../../../services/api'

import type { MealType, Recipe } from '../../../types'

type AddMealModalProps = {
    date: string
    mealType: MealType
    recipes: Recipe[]
    onClose: () => void
    onSuccess: () => void
}

const AddMealModal = ({
    date,
    mealType,
    recipes,
    onClose,
    onSuccess,
}: AddMealModalProps) => {
    const [selectedRecipe, setSelectedRecipe] = useState('')
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const filteredRecipes = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    const handleSubmit = async (e: SubmitEvent) => {
        e.preventDefault()
        if (!selectedRecipe) {
            toast.error('Please select a recipe')
            return
        }

        setLoading(true)

        try {
            await api.post('/meal-plans', {
                recipe_id: selectedRecipe,
                planned_date: date,
                meal_type: mealType,
            })
            toast.success('Meal added to plan')
            onSuccess()
        } catch {
            toast.error('Failed to add meal')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            Add Meal
                        </h2>
                        <p className="text-sm text-gray-600 capitalize">
                            {format(new Date(date), 'EEEE, MMM d')} - {mealType}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Search */}
                    <div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search recipes..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                        />
                    </div>

                    {/* Recipe List */}
                    <div className="max-h-64 overflow-y-auto space-y-2 custom-scrollbar">
                        {filteredRecipes.length > 0 ? (
                            filteredRecipes.map((recipe) => (
                                <label
                                    key={recipe.id}
                                    className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                                        selectedRecipe === recipe.id
                                            ? 'border-emerald-500 bg-emerald-50'
                                            : 'border-gray-200 hover:bg-gray-50'
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="recipe"
                                        value={recipe.id}
                                        checked={selectedRecipe === recipe.id}
                                        onChange={(e) =>
                                            setSelectedRecipe(e.target.value)
                                        }
                                        className="w-4 h-4 text-emerald-500 border-gray-300 focus:ring-emerald-500"
                                    />
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900">
                                            {recipe.name}
                                        </p>
                                        {recipe.cuisine_type && (
                                            <p className="text-xs text-gray-500">
                                                {recipe.cuisine_type}
                                            </p>
                                        )}
                                    </div>
                                </label>
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <ChefHat className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                                <p className="text-gray-500">
                                    No recipes found
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || !selectedRecipe}
                            className="flex-1 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Adding...' : 'Add Meal'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddMealModal
