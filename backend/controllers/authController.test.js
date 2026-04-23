import { jest, expect, describe, it, beforeEach } from '@jest/globals'
import jwt from 'jsonwebtoken'

process.env.JWT_SECRET = 'test-secret'

const mockUser = {
    findByEmail: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    verifyPassword: jest.fn(),
}

const mockUserPreferences = {
    upsert: jest.fn(),
}

jest.unstable_mockModule('../models/User.js', () => ({
    default: mockUser,
}))

jest.unstable_mockModule('../models/UserPreferences.js', () => ({
    default: mockUserPreferences,
}))

const { register, login } = await import('./authController.js')
const { default: User } = await import('../models/User.js')
console.log(
    'test User.create is mock?',
    typeof User.create === 'function' && User.create._isMockFunction,
)
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

describe('authController.login', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        jest.spyOn(console, 'error').mockImplementation(() => {})
    })
    it('return 400 when email/password are missing', async () => {
        const req = { body: {} }
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
        const next = jest.fn()

        await login(req, res, next)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Please provide email and password',
        })
        expect(User.findByEmail).not.toHaveBeenCalled()
        expect(User.verifyPassword).not.toHaveBeenCalled()
        expect(next).not.toHaveBeenCalled()
    })
    it('returns 401 when no user exists with the given email', async () => {
        User.findByEmail.mockResolvedValue(null)

        const req = { body: { email: 'test@example.com', password: 'test' } }
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
        const next = jest.fn()

        await login(req, res, next)

        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Invalid credentials',
        })
        expect(User.findByEmail).toHaveBeenCalledWith('test@example.com')
        expect(User.verifyPassword).not.toHaveBeenCalled()
        expect(next).not.toHaveBeenCalled()
    })
    it('returns 401 when password is incorrect', async () => {
        User.findByEmail.mockResolvedValue({
            id: '1',
            email: 'test@example.com',
            password_hash: 'fake-hash',
        })
        User.verifyPassword.mockResolvedValue(false)

        const req = { body: { email: 'test@example.com', password: 'wrong' } }
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
        const next = jest.fn()

        await login(req, res, next)

        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Invalid credentials',
        })
        expect(User.verifyPassword).toHaveBeenCalledWith('wrong', 'fake-hash')
        expect(next).not.toHaveBeenCalled()
    })
    it('return 200 when login is successful', async () => {
        const user = {
            id: '1',
            email: 'test@example.com',
            name: 'Test User',
            password_has: 'fake-hash',
        }
        User.findByEmail.mockResolvedValue(user)
        User.verifyPassword.mockResolvedValue(true)

        const req = { body: { email: 'test@example.com', password: 'test' } }
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
        const next = jest.fn()

        await login(req, res, next)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    id: '1',
                    email: 'test@example.com',
                    name: 'Test User',
                },
                token: expect.any(String),
            },
        })
        expect(next).not.toHaveBeenCalled()

        // assert token is actually valid
        const respPayload = res.json.mock.calls[0][0]
        const decoded = jwt.verify(
            respPayload.data.token,
            process.env.JWT_SECRET,
        )
        expect(decoded.id).toBe('1')
        expect(decoded.email).toBe('test@example.com')
    })
    it('forwards error to next()', async () => {
        const error = new Error('DB connection lost')
        User.findByEmail.mockRejectedValue(error)

        const req = { body: { email: 'test@example.com', password: 'test' } }
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
        const next = jest.fn()

        await login(req, res, next)

        expect(next).toHaveBeenCalledTimes(1)
        expect(next).toHaveBeenCalledWith(error)
        expect(res.status).not.toHaveBeenCalled()
        expect(res.json).not.toHaveBeenCalled()
    })
})
