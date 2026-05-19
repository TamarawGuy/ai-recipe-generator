import Navbar from '../../shared/Navbar'
import Loading from '../../shared/Loading'
import Header from '../../shared/Header'
import { useUserData } from './hooks/useUserData'
import ProfileSection from './components/ProfileSection'
import PasswordSection from './components/PasswordSection'
import PreferencesSection from './components/PreferencesSection'
import DeleteAccountSection from './components/DeleteAccountSection'

const Settings = () => {
    const { profile, preferences, loading } = useUserData()

    console.log('Profile >>>> ', profile)

    if (loading) {
        return <Loading />
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <Header
                    title="Settings"
                    subtitle="Manage your account and preferences"
                />

                <div className="space-y-6">
                    {/* Profile Section */}
                    <ProfileSection initialProfileData={profile} />

                    {/* Change Password Section */}
                    <PasswordSection />

                    {/* Preferences Section */}
                    <PreferencesSection initialPreferences={preferences} />

                    {/* Danger Zone */}
                    <DeleteAccountSection />
                </div>
            </div>
        </div>
    )
}

export default Settings
