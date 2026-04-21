import authMiddleware from './auth.js'
import { jest, describe, it, expect } from '@jest/globals'
import jwt from 'jsonwebtoken'

process.env.JWT_SECRET = 'test-secret'

describe('authMiddleware', () => {
    it('returns 401 if no token is provided', async () => {
        const req = { header: jest.fn().mockReturnValue(undefined) }
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
        const next = jest.fn()

        await authMiddleware(req, res, next)

        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'No authorization token, access denied',
        })
        expect(next).not.toHaveBeenCalled()
    })

    it('returns 401 if token is invalid', async () => {
        const req = { header: jest.fn().mockReturnValue('Bearer invalid') }
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
        const next = jest.fn()

        await authMiddleware(req, res, next)

        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Token is not valid',
        })
        expect(next).not.toHaveBeenCalled()
    })

    it('token is valid', async () => {
        const token = jwt.sign(
            { id: 1, email: 'test@test.bg' },
            process.env.JWT_SECRET,
        )
        const req = { header: jest.fn().mockReturnValue(`Bearer ${token}`) }
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
        const next = jest.fn()

        await authMiddleware(req, res, next)

        expect(req.user).toEqual({ id: 1, email: 'test@test.bg' })
        expect(next).toHaveBeenCalledTimes(1)
        expect(res.status).not.toHaveBeenCalled()
        expect(res.json).not.toHaveBeenCalled()
    })
})
