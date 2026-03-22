import User from '../models/User.js'
import UserPreferences from '../models/UserPreferences.js'

/**
 * Get user profile
 */
export const getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        const preferences = await UserPreferences.findUserById(req.user.id)

        res.json({
            success: true,
            data: {
                user,
                preferences,
            },
        })
    } catch (err) {
        next(err)
    }
}

/**
 * Update Profile
 */
export const updateProfile = async (req, res, next) => {
    try {
        const { name, email } = req.body

        const user = await User.update(req.user.id, { name, email })

        res.json({
            success: true,
            message: 'Profile updated successfully',
            data: { user },
        })
    } catch (err) {
        next(err)
    }
}

/**
 * Update User Preferences
 */
export const updatePreferences = async (req, res, next) => {
    try {
        const preferences = await UserPreferences.upsert(req.user.id, req.body)
        res.json({
            success: true,
            message: 'Preferences updated successfully',
            data: { preferences },
        })
    } catch (err) {
        next(err)
    }
}

/**
 * Change Password
 */
export const changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Please provide current and new password',
            })
        }

        // Verify current password
        const user = await User.findByEmail(req.user.email)
        const isValid = await User.verifyPassword(
            currentPassword,
            user.password_hash,
        )

        if (!isValid) {
            return res.status(401).json({
                success: false,
                message: 'Current password incorrent',
            })
        }

        // Update password
        await User.updatePassword(req.user.id, newPassword)

        res.json({
            success: true,
            message: 'Password changed successfully',
        })
    } catch (err) {
        next(err)
    }
}

/**
 * Delete account
 */
export const deleteAccount = async (req, res, next) => {
    try {
        await User.delete(req.user.id)
        res.json({
            success: true,
            message: 'Account deleted successfully',
        })
    } catch (err) {
        next(err)
    }
}
