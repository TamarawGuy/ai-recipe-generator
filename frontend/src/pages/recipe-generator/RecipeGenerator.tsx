import { Sparkles } from 'lucide-react'

import Navbar from '../../shared/Navbar'
import Header from '../../shared/Header'

import InputSection from './sections/InputSection'
import ResultSection from './sections/ResultSection'

import { useRecipeGenerator } from './hooks/useRecipeGenerator'
import { useUserPreferences } from './hooks/useUserPreferences'

const RecipeGenerator = () => {
    const {
        cuisineType,
        setCuisineType,
        dietaryRestrictions,
        setDietaryRestrictions,
        servings,
        setServings,
    } = useUserPreferences()
    const {
        ingredients,
        setIngredients,
        usePantry,
        setUsePantry,
        cookingTime,
        setCookingTime,
        generating,
        generatedRecipe,
        setGeneratedRecipe,
        handleGenerate,
    } = useRecipeGenerator(cuisineType, dietaryRestrictions, servings)

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-2xl mb-4">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <Header
                        title="AI Recipe Generator"
                        subtitle="Let AI create delicious recipes based on your ingredients"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Input Section */}
                    <InputSection
                        ingredients={ingredients}
                        setIngredients={setIngredients}
                        cuisineType={cuisineType}
                        setCuisineType={setCuisineType}
                        dietaryRestrictions={dietaryRestrictions}
                        setDietaryRestrictions={setDietaryRestrictions}
                        servings={servings}
                        setServings={setServings}
                        usePantry={usePantry}
                        setUsePantry={setUsePantry}
                        cookingTime={cookingTime}
                        setCookingTime={setCookingTime}
                        generating={generating}
                        handleGenerate={handleGenerate}
                    />

                    {/* Results Section */}
                    <ResultSection
                        generatedRecipe={generatedRecipe}
                        setGeneratedRecipe={setGeneratedRecipe}
                    />
                </div>
            </div>
        </div>
    )
}

export default RecipeGenerator
