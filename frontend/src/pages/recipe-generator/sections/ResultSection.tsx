import { ChefHat } from 'lucide-react'

import GeneratedRecipeHeader from '../components/GeneratedRecipeHeader'
import GeneratedRecipeIngredients from '../components/GeneratedRecipeIngredients'
import GeneratedRecipeInstructions from '../components/GeneratedRecipeInstructions'
import GeneratedRecipeCookingTips from '../components/GeneratedRecipeCookingTips'
import GeneratedRecipeNutrition from '../components/GeneratedRecipeNutrition'
import GeneratedRecipeActions from '../components/GeneratedRecipeActions'

import type { GeneratedRecipe } from '../../../types'

type ResultSectionProps = {
    generatedRecipe: GeneratedRecipe | null
    setGeneratedRecipe: (
        value: React.SetStateAction<GeneratedRecipe | null>,
    ) => void
}

const ResultSection = ({
    generatedRecipe,
    setGeneratedRecipe,
}: ResultSectionProps) => {
    return (
        <div>
            {generatedRecipe ? (
                <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
                    {/* Recipe Header */}
                    <GeneratedRecipeHeader generatedRecipe={generatedRecipe} />

                    {/* Ingredients */}
                    <GeneratedRecipeIngredients
                        generatedRecipe={generatedRecipe}
                    />

                    {/* Instructions */}
                    <GeneratedRecipeInstructions
                        generatedRecipe={generatedRecipe}
                    />

                    {/* Nutrition */}
                    <GeneratedRecipeNutrition
                        generatedRecipe={generatedRecipe}
                    />

                    {/* Cooking Tips */}
                    <GeneratedRecipeCookingTips
                        generatedRecipe={generatedRecipe}
                    />

                    {/* Actions */}
                    <GeneratedRecipeActions
                        generatedRecipe={generatedRecipe}
                        setGeneratedRecipe={setGeneratedRecipe}
                    />
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center h-full flex flex-col items-center justify-center">
                    <ChefHat className="w-16 h-16 text-gray-300 mb-4" />
                    <p className="text-gray-500">
                        Your generated recipe will appear here
                    </p>
                </div>
            )}
        </div>
    )
}

export default ResultSection
