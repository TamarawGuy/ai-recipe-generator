import { useState, useEffect } from 'react'

import api from '../../../services/api'

import type { Recipe } from '../../../types'

export const useRecipes = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([])
    const [loading, setLoading] = useState(false)

    const fetchRecipes = async () => {
        setLoading(true)
        try {
            const resp = await api.get('/recipes')
            setRecipes(resp.data.data.recipes)
        } catch (err) {
            console.error('Failed to load recipes: ', err)
        } finally {
            setLoading(false)
        }
    }

    const deleteRecipe = async (id: string) => {
        await api.delete(`/recipes/${id}`)
        setRecipes((prev) => prev.filter((recipe) => recipe.id !== id))
    }

    useEffect(() => {
        fetchRecipes()
    }, [])

    return { recipes, deleteRecipe, loading }
}
