import { Link } from 'react-router-dom'
import { ChefHat, UtensilsCrossed } from 'lucide-react'

const QuickActions = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Link
                to="/generate"
                className="bg-linear-to-r from-emerald-50 to-emerald-100 text-emerald-500 p-6 rounded-xl shadow-sm hover:shadow-md transition-all group"
            >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ChefHat className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">
                            Generate Recipe
                        </h3>
                        <p className="text-emerald-800 text-sm">
                            Create AI-powered recipes
                        </p>
                    </div>
                </div>
            </Link>

            <Link
                to="/pantry"
                className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-all group"
            >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <UtensilsCrossed className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-gray-900">
                            Manage Pantry
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Add and track ingredients
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default QuickActions
