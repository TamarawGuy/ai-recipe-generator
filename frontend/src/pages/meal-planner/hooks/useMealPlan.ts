import { useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'
import { addDays, format } from 'date-fns'

import api from '../../../services/api'

import type { MealPlan, MealType } from '../../../types'

export const useMealPlan = (weekStart: Date) => {
    const [mealPlan, setMealPlan] = useState<
        Record<string, Partial<Record<MealType, MealPlan>>>
    >({})
    const [loading, setLoading] = useState(true)

    const fetchMealPlan = useCallback(async () => {
        try {
            const startDate = format(weekStart, 'yyyy-MM-dd')
            const endDate = format(addDays(weekStart, 6), 'yyyy-MM-dd')

            const resp = await api.get(
                `/meal-plans/weekly?start_date=${startDate}&end_date=${endDate}`,
            )
            const meals = resp.data.data.mealPlans as MealPlan[]

            // organize meals by date and meal type
            const organized: Record<
                string,
                Partial<Record<MealType, MealPlan>>
            > = {}
            meals.forEach((meal: MealPlan) => {
                const dateKey = meal.meal_date
                if (!organized[dateKey]) {
                    organized[dateKey] = {}
                }
                organized[dateKey][meal.meal_type] = meal
            })

            setMealPlan(organized)
        } catch (err) {
            console.error('Failed to load meal plan: ', err)
            toast.error('Failed to load meal plan')
        } finally {
            setLoading(false)
        }
    }, [weekStart])

    useEffect(() => {
        fetchMealPlan()
    }, [fetchMealPlan])

    return { mealPlan, loading, refetchMealPlan: fetchMealPlan }
}
