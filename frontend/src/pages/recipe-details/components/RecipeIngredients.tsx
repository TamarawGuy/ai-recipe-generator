import { useState } from 'react'
import { Users } from 'lucide-react'

import type { RecipeDetails } from '../../../types'

type RecipeIngredientsProps = {
    recipe: RecipeDetails
    servings: number
    setServings: React.Dispatch<React.SetStateAction<number>>
}

const RecipeIngredients = ({
    recipe,
    servings,
    setServings,
}: RecipeIngredientsProps) => {
    const [checkedIngredients, setCheckedIngredients] = useState(new Set())

    const originalServings = recipe.servings || 4

    const toggleIngredient = (index: number) => {
        const newChecked = new Set(checkedIngredients)
        if (newChecked.has(index)) {
            newChecked.delete(index)
        } else {
            newChecked.add(index)
        }
        setCheckedIngredients(newChecked)
    }

    const adjustQuantity = (
        originalQuantity: number,
        originalServings: number,
    ) => {
        return ((originalQuantity * servings) / originalServings).toFixed(2)
    }

    return (
        <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Ingredients
                    </h2>
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Servings:</span>
                    </div>
                </div>

                {/* Servings Adjuster */}
                <div className="mb-6">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() =>
                                setServings(Math.max(1, servings - 1))
                            }
                            className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors cursor-pointer"
                        >
                            −
                        </button>
                        <span className="text-lg font-semibold text-gray-900 w-12 text-center">
                            {servings}
                        </span>
                        <button
                            onClick={() => setServings(servings + 1)}
                            className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors cursor-pointer"
                        >
                            +
                        </button>
                        {servings !== originalServings && (
                            <button
                                onClick={() => setServings(originalServings)}
                                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                            >
                                Reset
                            </button>
                        )}
                    </div>
                </div>

                {/* Ingredients List */}
                <div className="space-y-3">
                    {recipe.ingredients &&
                        recipe.ingredients.map((ingredient, index) => {
                            const adjustedQty = adjustQuantity(
                                ingredient.quantity,
                                originalServings,
                            )
                            const isChecked = checkedIngredients.has(index)

                            return (
                                <label
                                    key={index}
                                    className="flex items-start gap-3 cursor-pointer group"
                                >
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => toggleIngredient(index)}
                                        className="mt-1 w-4 h-4 text-emerald-500 border-gray-300 rounded focus:ring-emerald-500"
                                    />
                                    <span
                                        className={`flex-1 ${isChecked ? 'line-through text-gray-400' : 'text-gray-700'}`}
                                    >
                                        <span className="font-medium">
                                            {adjustedQty}
                                        </span>{' '}
                                        {ingredient.unit} {ingredient.name}
                                    </span>
                                </label>
                            )
                        })}
                </div>
            </div>
        </div>
    )
}

export default RecipeIngredients
