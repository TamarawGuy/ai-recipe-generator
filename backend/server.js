import dotenv from 'dotenv'

dotenv.config()

import express from 'express'
import cors from 'cors'

import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import pantryRoutes from './routes/pantry.js'
import recipeRoutes from './routes/recipes.js'
import mealPlanRoutes from './routes/mealPlans.js'
import shoppingListRoutes from './routes/shoppingList.js'

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.json({ message: 'AI Recipe api' })
})

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/pantry', pantryRoutes)
app.use('/api/recipes', recipeRoutes)
app.use('/api/meal-plans', mealPlanRoutes)
app.use('/api/shopping-list', shoppingListRoutes)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})
