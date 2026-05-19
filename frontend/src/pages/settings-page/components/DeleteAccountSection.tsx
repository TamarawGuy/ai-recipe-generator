import toast from 'react-hot-toast'
import { Trash2 } from 'lucide-react'

import api from '../../../services/api'
import { useAuth } from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const DeleteAccountSection = () => {
    const navigate = useNavigate()
    const { logout } = useAuth()
    const handleDeleteAccount = async () => {
        if (
            !confirm(
                'Are you sure you want to delete your account? This action cannot be undone.',
            )
        ) {
            return
        }

        const confirmation = prompt(
            'Type "DELETE" to confirm account deletion:',
        )
        if (confirmation !== 'DELETE') {
            toast.error('Account deletion cancelled')
            return
        }

        try {
            await api.delete('/users/account')
            toast.success('Account deleted successfully!')
            logout()
            navigate('/login')
        } catch (err) {
            console.error('Failed to delete account: ', err)
            toast.error('Failed to delete account')
        }
    }

    return (
        <div className="bg-white rounded-xl border border-red-200 p-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <Trash2 className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                    Danger Zone
                </h2>
            </div>

            <p className="text-gray-600 mb-4">
                Once you delete your account, there is no going back. All your
                recipes, meal plans, and data will be permanently deleted.
            </p>

            <button
                onClick={handleDeleteAccount}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer"
            >
                <Trash2 className="w-4 h-4" />
                Delete Account
            </button>
        </div>
    )
}

export default DeleteAccountSection
