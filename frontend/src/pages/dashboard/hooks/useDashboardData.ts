import { useState, useEffect } from 'react'

import api from '../../../services/api'

import type { Recipe, UpcomingMeal } from '../../../types'

export const useDashboardData = () => {
    const [stats, setStats] = useState({
        totalRecipes: 0,
        pantryItems: 0,
        mealsThisWeek: 0,
    })
    const [recentRecipes, setRecentRecipes] = useState<Recipe[]>([])
    const [upcomingMeals, setUpcomingMeals] = useState<UpcomingMeal[]>([])
    const [loading, setLoading] = useState(true)

    const fetchDashboardData = async () => {
        try {
            const [recipesRes, pantryRes, mealPlanRes, recentRes, upcomingRes] =
                await Promise.all([
                    api.get('/recipes/stats'),
                    api.get('/pantry/stats'),
                    api.get('/meal-plans/stats'),
                    api.get('/recipes/recent?limit=5'),
                    api.get('/meal-plans/upcoming?limit=5'),
                ])

            setStats({
                totalRecipes: recipesRes.data.data.stats.total_recipes || 0,
                pantryItems: pantryRes.data.data.stats.total_items || 0,
                mealsThisWeek: mealPlanRes.data.data.stats.this_week_count || 0,
            })
            setRecentRecipes(recentRes.data.data.recipes || [])
            setUpcomingMeals(upcomingRes.data.data.meals || [])
        } catch (err) {
            console.error('Error fetching dashboard data: ', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDashboardData()
    }, [])

    return { stats, recentRecipes, upcomingMeals, loading }
}
