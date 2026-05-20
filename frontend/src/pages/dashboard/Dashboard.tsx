import { ChefHat, UtensilsCrossed, Calendar } from 'lucide-react'

import Navbar from '../../shared/Navbar'
import Loading from '../../shared/Loading'
import Header from '../../shared/Header'

import StatCard from './components/StatCard'
import QuickActions from './components/QuickActions'
import RecentRecipes from './components/RecentRecipes'
import UpcomingMeals from './components/UpcomingMeals'

import { useDashboardData } from './hooks/useDashboardData'

const Dashboard = () => {
    const { stats, recentRecipes, upcomingMeals, loading } = useDashboardData()

    if (loading) {
        return <Loading />
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <Header
                    title="Dashboard"
                    subtitle="Welcome back! Here's your cooking overview"
                />

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard
                        icon={<ChefHat className="w-6 h-6" />}
                        label="Total Recipes"
                        value={stats.totalRecipes}
                        color="emerald"
                    />
                    <StatCard
                        icon={<UtensilsCrossed className="w-6 h-6" />}
                        label="Pantry Items"
                        value={stats.pantryItems}
                        color="blue"
                    />
                    <StatCard
                        icon={<Calendar className="w-6 h-6" />}
                        label="Meals This Week"
                        value={stats.mealsThisWeek}
                        color="purple"
                    />
                </div>

                {/* Quick Actions */}
                <QuickActions />

                {/* Recent Recipes & Upcoming Meals */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Recipes */}
                    <RecentRecipes recentRecipes={recentRecipes} />

                    {/* Upcoming Meals */}
                    <UpcomingMeals upcomingMeals={upcomingMeals} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
