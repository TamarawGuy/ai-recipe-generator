import { useState, type SubmitEvent } from 'react'
import toast from 'react-hot-toast'
import { Lock } from 'lucide-react'

import api from '../../../services/api'

const PasswordSection = () => {
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    })
    const [saving, setSaving] = useState(false)

    const handlePasswordChange = async (e: SubmitEvent) => {
        e.preventDefault()

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error('Passwords do not match')
            return
        }

        if (passwordData.newPassword.length < 6) {
            toast.error('Password must be at least 6 characters')
            return
        }

        setSaving(true)

        try {
            await api.put('/users/change-password', {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword,
            })
            toast.success('Password changed successfully!')
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            })
        } catch (err) {
            console.error('Failed to save new password: ', err)
            toast.error('Failed to save new password')
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Lock className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                    Change Password
                </h2>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                    </label>
                    <input
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) =>
                            setPasswordData({
                                ...passwordData,
                                currentPassword: e.target.value,
                            })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                    </label>
                    <input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) =>
                            setPasswordData({
                                ...passwordData,
                                newPassword: e.target.value,
                            })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                        required
                        minLength={6}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                    </label>
                    <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) =>
                            setPasswordData({
                                ...passwordData,
                                confirmPassword: e.target.value,
                            })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                        required
                        minLength={6}
                    />
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 cursor-pointer"
                >
                    <Lock className="w-4 h-4" />
                    {saving ? 'Changing...' : 'Change Password'}
                </button>
            </form>
        </div>
    )
}

export default PasswordSection
