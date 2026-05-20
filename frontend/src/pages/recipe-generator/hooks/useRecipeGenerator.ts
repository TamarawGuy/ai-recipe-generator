import { useState } from 'react'
import toast from 'react-hot-toast'

import api from '../../../services/api'

import type { GeneratedRecipe } from '../../../types'

export const useRecipeGenerator = (
    cuisineType: string,
    dietaryRestrictions: string[],
    servings: number,
) => {
    const [ingredients, setIngredients] = useState<string[]>([])
    const [usePantry, setUsePantry] = useState(false)
    const [cookingTime, setCookingTime] = useState('medium')
    const [generating, setGenerating] = useState(false)
    const [generatedRecipe, setGeneratedRecipe] =
        useState<GeneratedRecipe | null>(null)

    const handleGenerate = async () => {
        if (!usePantry && ingredients.length === 0) {
            toast.error(
                'Please add at least one ingredient or use pantry items',
            )
            return
        }

        setGenerating(true)
        setGeneratedRecipe(null)

        try {
            const resp = await api.post('/recipes/generate', {
                ingredients,
                usePantryIngredients: usePantry,
                dietaryRestrictions,
                cuisineType: cuisineType === 'Any' ? 'any' : cuisineType,
                servings,
                cookingTime,
            })

            setGeneratedRecipe(resp.data.data.recipe)
            toast.success('Recipe generated successfully!')
        } catch (err) {
            console.error('Failed to generate recipe: ', err)
            toast.error('Failed to generate recipe')
        } finally {
            setGenerating(false)
        }
    }

    return {
        ingredients,
        setIngredients,
        usePantry,
        setUsePantry,
        cookingTime,
        setCookingTime,
        generating,
        generatedRecipe,
        setGeneratedRecipe,
        handleGenerate,
    }
}
