import { useState } from 'react'
import toast from 'react-hot-toast'

import api from '../../../services/api'

import type { GeneratedRecipe } from '../../../types'

type GeneratedRecipeActionsProps = {
    generatedRecipe: GeneratedRecipe
    setGeneratedRecipe: (
        value: React.SetStateAction<GeneratedRecipe | null>,
    ) => void
}

const GeneratedRecipeActions = ({
    generatedRecipe,
    setGeneratedRecipe,
}: GeneratedRecipeActionsProps) => {
    const [saving, setSaving] = useState(false)
    const handleSaveRecipe = async () => {
        if (!generatedRecipe) return

        setSaving(true)

        try {
            await api.post('/recipes', {
                name: generatedRecipe.name,
                description: generatedRecipe.description,
                cuisine_type: generatedRecipe.cuisineType,
                difficulty: generatedRecipe.difficulty,
                prep_time: generatedRecipe.prepTime,
                cook_time: generatedRecipe.cookTime,
                servings: generatedRecipe.servings,
                instructions: generatedRecipe.instructions,
                dietary_tags: generatedRecipe.dietaryTags || [],
                ingredients: generatedRecipe.ingredients,
                nutrition: generatedRecipe.nutrition,
            })

            toast.success('Recipe saved to your collection!')
        } catch (err) {
            console.error('Failed to save recipe: ', err)
            toast.error('Failed to save recipe')
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
                onClick={handleSaveRecipe}
                disabled={saving}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50"
            >
                {saving ? 'Saving...' : 'Save Recipe'}
            </button>
            <button
                onClick={() => setGeneratedRecipe(null)}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
                New Recipe
            </button>
        </div>
    )
}

export default GeneratedRecipeActions
