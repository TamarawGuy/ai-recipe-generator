import { useState, useEffect } from 'react'

import api from '../../../services/api'

export const useUserPreferences = () => {
    const [cuisineType, setCuisineType] = useState('Any')
    const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([])
    const [servings, setServings] = useState(4)
    const [, setPreferencesLoaded] = useState(false)

    const fetchUserPreferences = async () => {
        try {
            const resp = await api.get('/users/profile')
            const preferences = resp.data.data.preferences

            if (preferences) {
                // Auto-fill dietary restrictions
                if (
                    preferences.dietary_restrictions &&
                    preferences.dietary_restrictions.length > 0
                ) {
                    setDietaryRestrictions(preferences.dietary_restrictions)
                }

                // Auto-fill prefered cuisine (use first one if multiple)
                if (
                    preferences.preferred_cuisines &&
                    preferences.preferred_cuisines.length > 0
                ) {
                    setCuisineType(preferences.preferred_cuisines[0])
                }

                // Auto-fill default servings
                if (preferences.default_servings) {
                    setServings(preferences.default_servings)
                }

                setPreferencesLoaded(true)
            }
        } catch (err) {
            console.error('Failed to fetch user preferences: ', err)
            setPreferencesLoaded(true)
        }
    }

    // Load user preferences on component mount
    useEffect(() => {
        fetchUserPreferences()
    }, [])

    return {
        cuisineType,
        setCuisineType,
        dietaryRestrictions,
        setDietaryRestrictions,
        servings,
        setServings,
    }
}
