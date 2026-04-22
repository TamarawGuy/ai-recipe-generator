import User from '../models/User.js'
import UserPreferences from '../models/UserPreferences.js'
import jwt from 'jsonwebtoken'

/**
 * Generate JWT token
 */
const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '30d' },
    )
}

/**
 * Register new user
 */
export const register = async (req, res, next) => {
    try {
        const { email, password, name } = req.body

        // Validate
        if (!email || !password || !name) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email, password, and name',
            })
        }

        // Check if user exists
        const existingUser = await User.findByEmail(email)
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email',
            })
        }

        // Create user
        const user = await User.create({ email, password, name })

        // Create default preferences
        await UserPreferences.upsert(user.id, {
            dietary_restrictions: [],
            allergies: [],
            preferred_cuisines: [],
            default_servings: 4,
            measurement_unit: 'metric',
        })

        // Generate token
        const token = generateToken(user)

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                },
                token,
            },
        })
    } catch (err) {
        next(err)
    }
}

/**
 * Login user
 */
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        // Validate
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password',
            })
        }

        // Find user
        const user = await User.findByEmail(email)

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            })
        }

        // Verify password
        const isPasswordValid = await User.verifyPassword(
            password,
            user.password_hash,
        )
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            })
        }

        // Generate token
        const token = generateToken(user)

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                },
                token,
            },
        })
    } catch (err) {
        next(err)
    }
}

/**
 * Get current user
 */
export const getCurrentUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            })
        }

        res.json({
            success: true,
            data: { user },
        })
    } catch (err) {
        next(err)
    }
}

/**
 * Request password reset (placeholder - would send email in prod)
 */
export const requestPasswordReset = async (req, res, next) => {
    try {
        const { email } = req.body

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email',
            })
        }

        const user = await User.findByEmail(email)

        res.json({
            success: true,
            message: 'If an account exists, a password reset link is sent',
        })
    } catch (err) {
        next(err)
    }
}
