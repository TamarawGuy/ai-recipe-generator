import { useState } from 'react'
import { Plus, X } from 'lucide-react'

type IngredientsProps = {
    ingredients: string[]
    setIngredients: React.Dispatch<React.SetStateAction<string[]>>
    usePantry: boolean
    setUsePantry: React.Dispatch<React.SetStateAction<boolean>>
}

const Ingredients = ({
    ingredients,
    setIngredients,
    usePantry,
    setUsePantry,
}: IngredientsProps) => {
    const [inputValue, setInputValue] = useState('')

    const addIngredient = () => {
        if (inputValue.trim() && !ingredients.includes(inputValue.trim())) {
            setIngredients([...ingredients, inputValue.trim()])
            setInputValue('')
        }
    }

    const removeIngredient = (ingredient: string) => {
        setIngredients(ingredients.filter((i) => i !== ingredient))
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            {/* Use Pantry Toggle */}
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Ingredients
            </h2>
            <div className="flex items-center gap-3 mb-4 p-3 bg-emerald-50 rounded-lg">
                <input
                    type="checkbox"
                    id="use-pantry"
                    checked={usePantry}
                    onChange={(e) => setUsePantry(e.target.checked)}
                    className="w-4 h-4 text-emerald-500 border-gray-300 rounded focus:ring-emerald-500"
                />
                <label
                    htmlFor="use-pantry"
                    className="text-sm font-medium text-emerald-900"
                >
                    Use ingredients from my pantry
                </label>
            </div>

            {/* Manual Ingredient Input */}
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addIngredient()}
                    placeholder="Add ingredient (e.g., tomatoes)"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
                <button
                    onClick={addIngredient}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors cursor-pointer"
                >
                    <Plus className="w-5 h-5" />
                </button>
            </div>

            {/* Ingredient Tags */}
            {ingredients.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {ingredients.map((ingredient, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                            {ingredient}
                            <button
                                onClick={() => removeIngredient(ingredient)}
                                className="hover:text-red-600 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </span>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Ingredients
