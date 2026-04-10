/**
 * User types
 */

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

/**
 * Recipe types
 */
export type Recipe = {
    id: string
    user_id: string
    name: string
    description: string
    cuisine_type: string
    difficulty: string
    prep_time: number
    cook_time: number
    servings: number
    instructions: string[]
    dietary_tags: string[]
    calories: number
    image_url: string | null
    user_notes: string | null
    created_at: string
    updated_at: string
}

export type RecipeIngredient = {
    id: string
    recipe_id: string
    name: string
    quantity: number
    unit: string
    created_at: string
}

export type RecipeNutrition = {
    id: string
    recipe_id: string
    calories: number
    protein: number
    carbs: number
    fats: number
    fiber: number
    created_at: string
}

export type RecipeDetails = Recipe & {
    ingredients: RecipeIngredient[]
    nutrition: RecipeNutrition | null
}

/**
 * Pantry item
 */
export type PantryItem = {
    id: string
    user_id: string
    name: string
    quantity: string
    unit: string
    category: string
    expiry_date: string | null
    is_running_low: boolean
    created_at: string
    updated_at: string
}
