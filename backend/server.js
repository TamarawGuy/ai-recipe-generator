import dotenv from 'dotenv'

dotenv.config()

import express from 'express'
import cors from 'cors'

import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'

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

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
