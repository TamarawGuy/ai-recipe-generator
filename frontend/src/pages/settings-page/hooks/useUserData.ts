import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

import api from '../../../services/api'
import type { UserPreferences } from '../../../types'

type Preferences = Omit<UserPreferences, 'id' | 'user_id'>

export const useUserData = () => {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
    })

    const [preferences, setPreferences] = useState<Preferences>({
        dietary_restrictions: [],
        allergies: [],
        preferred_cuisines: [],
        default_servings: 4,
        measurement_unit: 'metric',
    })

    const [loading, setLoading] = useState(true)

    const fetchUserData = async () => {
        try {
            const resp = await api.get('/users/profile')
            const { user, preferences: userPrefs } = resp.data.data

            setProfile({
                name: user.name,
                email: user.email,
            })

            if (userPrefs) {
                setPreferences({
                    dietary_restrictions: userPrefs.dietary_restrictions || [],
                    allergies: userPrefs.allergies || [],
                    preferred_cuisines: userPrefs.preferred_cuisines || [],
                    default_servings: userPrefs.default_servings || 4,
                    measurement_unit: userPrefs.measurement_unit || 'metric',
                })
            }
        } catch (err) {
            console.error('Failed to load user data: ', err)
            toast.error('Failed to load user data')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUserData()
    }, [])

    return { profile, preferences, loading }
}
