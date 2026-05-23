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

const getPantryItemsDeclaration = {
    name: 'get_pantry_items',
    description:
        "List items in the authenticated user's pantry. Use this when the user asks what they have, what's in their pantry, what ingredients are available, or wants to filter pantry items by category or low-stock status. Do NOT use this for expiry-based questions — use get_expiring_items for that.",
    parameters: {
        type: 'object',
        properties: {
            category: {
                type: 'string',
                enum: [
                    'Vegetables',
                    'Fruits',
                    'Dairy',
                    'Meat',
                    'Grains',
                    'Spices',
                    'Other',
                ],
                description: 'Optional category filter.',
            },
            is_running_low: {
                type: 'boolean',
                description:
                    'If true, return only items marked as running low.',
            },
            search: {
                type: 'string',
                description:
                    'Optional free-text search across pantry item names.',
            },
        },
    },
}

const getExpiringItemsDeclaration = {
    name: 'get_expiring_items',
    description:
        "List pantry items that are expiring within the next N days. Use this whenever the user asks what's expiring soon, what they should use up, or anything about expiration dates. Default window is 7 days.",
    parameters: {
        type: 'object',
        properties: {
            days: {
                type: 'integer',
                description:
                    'Look ahead this many days for expiring items. Defaults to 7.',
            },
        },
    },
}

export const tools = [
    {
        functionDeclarations: [
            getRecipesDeclaration,
            getPantryItemsDeclaration,
            getExpiringItemsDeclaration,
        ],
    },
]

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

    if (name === 'get_pantry_items') {
        const items = await PantryItem.findByUserId(userId, args)

        return items.map((i) => ({
            id: i.id,
            name: i.name,
            category: i.category,
            quantity: i.quantity,
            unit: i.unit,
            is_running_low: i.is_running_low,
            expiry_date: i.expiry_date,
        }))
    }

    if (name === 'get_expiring_items') {
        const items = await PantryItem.getExpiringSoon(userId, args.days ?? 7)

        return items.map((i) => ({
            id: i.id,
            name: i.name,
            expiry_date: i.expiry_date,
            quantity: i.quantity,
            unit: i.unit,
        }))
    }

    throw new Error(`Unknown tool: ${name}`)
}
