import { jest, it, describe, expect, beforeEach } from '@jest/globals'
import request from 'supertest'

process.env.JWT_SECRET = 'test-secret'

// Hoisted mock references — every factory invocation returns the SAME objects,
// so the test file and the controller share identical jest.fn() instances.
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

const { default: app } = await import('../app.js')

describe('POST /api/auth/signup', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('creates a new user and returns 201', async () => {
        const createdUser = {
            id: '1',
            email: 'test@example.com',
            name: 'Test User',
        }
        mockUser.findByEmail.mockResolvedValue(null)
        mockUser.create.mockResolvedValue(createdUser)
        mockUserPreferences.upsert.mockResolvedValue(undefined)

        const response = await request(app).post('/api/auth/signup').send({
            email: 'test@example.com',
            password: 'test',
            name: 'Test User',
        })

        expect(response.status).toBe(201)
        expect(response.body).toEqual({
            success: true,
            message: 'User registered successfully',
            data: {
                user: {
                    id: '1',
                    email: 'test@example.com',
                    name: 'Test User',
                },
                token: expect.any(String),
            },
        })
        expect(mockUser.findByEmail).toHaveBeenCalledWith('test@example.com')
        expect(mockUser.create).toHaveBeenCalledWith({
            email: 'test@example.com',
            password: 'test',
            name: 'Test User',
        })
        expect(mockUserPreferences.upsert).toHaveBeenCalledWith(
            '1',
            expect.objectContaining({ default_servings: 4 }),
        )
    })
})
