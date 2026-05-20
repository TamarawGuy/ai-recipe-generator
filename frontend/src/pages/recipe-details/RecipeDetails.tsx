import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

import Navbar from '../../shared/Navbar'
import Loading from '../../shared/Loading'

import { useRecipeDetailsData } from './hooks/useRecipeDetailsData'
import RecipeHeader from './sections/RecipeHeader'
import RecipeBody from './sections/RecipeBody'

const RecipeDetails = () => {
    const { id } = useParams()
    const { recipe, servings, setServings, loading } = useRecipeDetailsData(id)

    if (loading) {
        return <Loading />
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back button */}
                <Link
                    to="/recipes"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Recipes
                </Link>

                {/* Recipe Header */}
                <RecipeHeader recipe={recipe} />
                {/* Recipe Body */}
                <RecipeBody
                    recipe={recipe}
                    servings={servings}
                    setServings={setServings}
                />
            </div>
        </div>
    )
}

export default RecipeDetails
