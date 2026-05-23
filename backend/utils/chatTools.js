import Recipe from '../models/Recipe.js'
import PantryItem from '../models/PantryItem.js'

const getRecipesDeclaration = {
    name: 'get_recipes',
    description:
        "Search the authenticated user's saved recipes. Use this whenever the user asks about recipes they have saved, wants to list their recipes, or wants to filter their recipes by cuisine, difficulty, dietary tag, or cook time.",
    parameters: {
        type: 'object',
        properties: {
            search: {
                type: 'string',
                description:
                    'Optional free-text search across recipe name and description',
            },
            cuisine_type: {
                type: 'string',
                enum: [
                    'Any',
                    'Italian',
                    'Mexican',
                    'Indian',
                    'Chinese',
                    'Japanese',
                    'Thai',
                    'French',
                    'Mediterranean',
                    'American',
                ],
                description:
                    'Optional cuisine filter, e.g. "italian", "mexican", "thai".',
            },
            difficulty: {
                type: 'string',
                enum: ['easy', 'medium', 'hard'],
                description: 'Optional difficulty filter',
            },
            dietary_tag: {
                type: 'string',
                description:
                    'Optional dietary tag, e.g. "vegetarian", "gluten-free", "vegan".',
            },
            max_cook_time: {
                type: 'integer',
                description: 'Optional maximum cook time in minutes.',
            },
            limit: {
                type: 'integer',
                description: 'Max number of recipes to return. Default 10.',
            },
        },
    },
}

export const tools = [{ functionDeclarations: [getRecipesDeclaration] }]

export const runTool = async (name, args, userId) => {
    if (name === 'get_recipes') {
        const recipes = await Recipe.findByUserId(userId, {
            ...args,
            limit: args.limit ?? 10,
        })

        return recipes.map((r) => ({
            id: r.id,
            name: r.name,
            description: r.description,
            cuisine_type: r.cuisine_type,
            difficulty: r.difficulty,
            cook_time: r.cook_time,
            dietary_tags: r.dietary_tags,
        }))
    }
    throw new Error(`Unknown tool: ${name}`)
}
