import { useState, useMemo } from 'react'
import toast from 'react-hot-toast'

import Navbar from '../../shared/Navbar'
import Loading from '../../shared/Loading'
import Header from '../../shared/Header'
import RecipeCard from './components/RecipeCard'
import RecipesEmpty from './components/RecipesEmpty'
import SearchFilter from './components/SearchFilter'
import CuisineFilter from './components/CuisineFilter'
import DifficultyFilter from './components/DifficultyFilter'

import { useRecipes } from './hooks/useRecipes'

const MyRecipes = () => {
    const { recipes, deleteRecipe, loading } = useRecipes()
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCuisine, setSelectedCuisine] = useState('All')
    const [selectedDifficulty, setSelectedDifficulty] = useState('All')

    const filteredRecipes = useMemo(() => {
        let filtered = recipes

        if (searchQuery) {
            filtered = filtered.filter(
                (recipe) =>
                    recipe.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    recipe.description
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase()),
            )
        }
        if (selectedCuisine !== 'All') {
            filtered = filtered.filter(
                (recipe) => recipe.cuisine_type === selectedCuisine,
            )
        }

        if (selectedDifficulty !== 'All') {
            filtered = filtered.filter(
                (recipe) => recipe.difficulty === selectedDifficulty,
            )
        }

        return filtered
    }, [recipes, searchQuery, selectedCuisine, selectedDifficulty])

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this recipe?')) return

        try {
            await deleteRecipe(id)
            toast.success('Recipe deleted')
        } catch {
            toast.error('Failed to delete recipe')
        }
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <Header
                    title="My Recipes"
                    subtitle="Your collection of saved recipes"
                />

                {/* Search and Filters */}
                <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <SearchFilter
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                        />

                        {/* Cuisine Filter */}
                        <CuisineFilter
                            selectedCuisine={selectedCuisine}
                            setSelectedCuisine={setSelectedCuisine}
                        />

                        {/* Difficulty Filter */}
                        <DifficultyFilter
                            selectedDifficulty={selectedDifficulty}
                            setSelectedDifficulty={setSelectedDifficulty}
                        />
                    </div>
                </div>

                {/* Recipe Count */}
                <div className="mb-4">
                    <p className="text-sm text-gray-600">
                        Showing {filteredRecipes.length} of {recipes.length}{' '}
                        recipes
                    </p>
                </div>

                {/* Recipes Grid */}
                {filteredRecipes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredRecipes.map((recipe) => (
                            <RecipeCard
                                key={recipe.id}
                                recipe={recipe}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                ) : (
                    <RecipesEmpty recipes={recipes} />
                )}
            </div>
        </div>
    )
}

export default MyRecipes
