import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '')

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No authorization token, access denied',
            })
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // Add user info to request
        req.user = {
            id: decoded.id,
            email: decoded.email,
        }

        next()
    } catch (err) {
        console.error('Auth middleware error: ', err)
        res.status(401).json({
            success: false,
            message: 'Token is not valid',
        })
    }
}

export default authMiddleware
