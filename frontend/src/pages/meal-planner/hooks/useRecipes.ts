import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

import api from '../../../services/api'

import type { Recipe } from '../../../types'

export const useRecipes = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([])

    const fetchRecipes = async () => {
        try {
            const resp = await api.get('/recipes')
            setRecipes(resp.data.data.recipes)
        } catch {
            toast.error('Failed to load recipes')
        }
    }

    useEffect(() => {
        fetchRecipes()
    }, [])

    return { recipes }
}
