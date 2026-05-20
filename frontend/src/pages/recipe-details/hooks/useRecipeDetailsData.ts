import { useState, useEffect } from 'react'

import api from '../../../services/api'

import type { RecipeDetails } from '../../../types'

export const useRecipeDetailsData = (id: string | undefined) => {
    const [recipe, setRecipe] = useState<RecipeDetails | null>(null)
    const [servings, setServings] = useState(4)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!id) return
        const fetchRecipe = async () => {
            try {
                const resp = await api.get(`/recipes/${id}`)
                const recipeData = resp.data.data.recipe
                setRecipe(recipeData)
                setServings(recipeData.servings || 4)
            } catch (err) {
                console.error('Failed to load recipe: ', err)
            } finally {
                setLoading(false)
            }
        }

        fetchRecipe()
    }, [id])

    return { recipe, servings, setServings, loading }
}
