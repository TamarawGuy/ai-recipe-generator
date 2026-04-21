import { jest, expect, describe, it, beforeEach } from '@jest/globals'
import jwt from 'jsonwebtoken'

process.env.JWT_SECRET = 'test-secret'

jest.unstable_mockModule('../models/User.js', () => ({
    default: {
        findByEmail: jest.fn(),
        create: jest.fn(),
        verifyPassword: jest.fn(),
    },
}))

jest.unstable_mockModule('../models/UserPreferences.js', () => ({
    default: {
        upsert: jest.fn(),
    },
}))

const { register } = await import('./authController.js')
const { default: User } = await import('../models/User.js')
const { default: UserPreferences } =
    await import('../models/UserPreferences.js')

describe('authController.register', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it('returns 400 if email/password/name are missing', async () => {
        const req = { body: {} }
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
        const next = jest.fn()

        await register(req, res, next)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Please provide email, password, and name',
        })
        expect(next).not.toHaveBeenCalled()
    })

    it('returns 400 if user email already exists', async () => {
        // pretend User.findByEmail finds an email
        User.findByEmail.mockResolvedValue({ id: 1, email: 'test@example.com' })

        const req = {
            body: {
                email: 'test@example.com',
                password: 'test',
                name: 'Test User',
            },
        }
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
        const next = jest.fn()

        await register(req, res, next)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'User already exists with this email',
        })
        expect(next).not.toHaveBeenCalled()

        // interaction with the mock
        expect(User.findByEmail).toHaveBeenCalledWith('test@example.com')
        expect(User.create).not.toHaveBeenCalled()
    })

    it('creates a new user and returns 201 with a token on success', async () => {
        const createdUser = {
            id: '1',
            email: 'new@example.com',
            name: 'New User',
        }
        User.findByEmail.mockResolvedValue(null)
        User.create.mockResolvedValue(createdUser)
        UserPreferences.upsert.mockResolvedValue(undefined)

        const req = {
            body: {
                email: 'new@example.com',
                password: 'test',
                name: 'New User',
            },
        }
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
        const next = jest.fn()

        await register(req, res, next)

        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'User registered successfully',
            data: {
                user: {
                    id: '1',
                    email: 'new@example.com',
                    name: 'New User',
                },
                token: expect.any(String),
            },
        })
        expect(next).not.toHaveBeenCalled()

        // interaction with the mock
        expect(User.findByEmail).toHaveBeenCalledWith('new@example.com')
        expect(User.create).toHaveBeenCalledWith({
            email: 'new@example.com',
            password: 'test',
            name: 'New User',
        })
        expect(UserPreferences.upsert).toHaveBeenCalledWith('1', {
            dietary_restrictions: [],
            allergies: [],
            preferred_cuisines: [],
            default_servings: 4,
            measurement_unit: 'metric',
        })

        // assert token is actually valid
        const respPayload = res.json.mock.calls[0][0]
        const decoded = jwt.verify(
            respPayload.data.token,
            process.env.JWT_SECRET,
        )
        expect(decoded.id).toBe('1')
        expect(decoded.email).toBe('new@example.com')
    })

    it('forwards error to next()', async () => {
        const error = new Error('DB connection lost')
        User.findByEmail.mockResolvedValue(null)
        User.create.mockRejectedValue(error)

        const req = {
            body: { email: 'x@example.com', password: 'test', name: 'X' },
        }
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
        const next = jest.fn()

        await register(req, res, next)

        expect(next).toHaveBeenCalledTimes(1)
        expect(next).toHaveBeenCalledWith(error)
        expect(res.status).not.toHaveBeenCalled()
        expect(res.json).not.toHaveBeenCalled()
    })
})
