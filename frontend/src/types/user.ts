export type User = {
    id: string
    email: string
    name: string
}

export type UserPreferences = {
    id: string
    user_id: string
    dietary_restrictions: string[]
    allergies: string[]
    preferred_cuisines: string[]
    default_servings: number
    measurement_unit: 'metric' | 'imperial'
}
