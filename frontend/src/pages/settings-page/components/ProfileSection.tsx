import { useState, type SubmitEvent } from 'react'
import toast from 'react-hot-toast'
import { User, Save } from 'lucide-react'

import api from '../../../services/api'
import { useAuth } from '../../../context/AuthContext'

type ProfileSectionProps = {
    initialProfileData: { name: string; email: string }
}

const ProfileSection = ({ initialProfileData }: ProfileSectionProps) => {
    const { user } = useAuth()
    const [profile, setProfile] = useState(initialProfileData)
    const [saving, setSaving] = useState(false)

    const handleProfileUpdate = async (e: SubmitEvent) => {
        e.preventDefault()

        setSaving(true)
        try {
            await api.put('/users/profile', profile)
            toast.success('Profile updated successfully')

            // update local storage
            const updatedUser = { ...user, ...profile }
            localStorage.setItem('user', JSON.stringify(updatedUser))
        } catch (err) {
            console.error('Failed to update profile: ', err)
            toast.error('Failed to update profile')
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                    Profile Information
                </h2>
            </div>

            <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        value={profile.name}
                        onChange={(e) =>
                            setProfile({
                                ...profile,
                                name: e.target.value,
                            })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        value={profile.email}
                        disabled
                        onChange={(e) =>
                            setProfile({
                                ...profile,
                                email: e.target.value,
                            })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 cursor-pointer"
                >
                    <Save className="w-4 h-4" />
                    {saving ? 'Saving...' : 'Save Profile'}
                </button>
            </form>
        </div>
    )
}

export default ProfileSection
