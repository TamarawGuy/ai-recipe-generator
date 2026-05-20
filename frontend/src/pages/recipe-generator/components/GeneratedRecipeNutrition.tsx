import NutritionBadge from './NutritionBadge'

import type { GeneratedRecipe } from '../../../types'

type GeneratedRecipeNutritionProps = {
    generatedRecipe: GeneratedRecipe
}

const GeneratedRecipeNutrition = ({
    generatedRecipe,
}: GeneratedRecipeNutritionProps) => {
    if (!generatedRecipe.nutrition) return null
    return (
        <>
            {generatedRecipe.nutrition && (
                <div>
                    <h3 className="font-semibold text-gray-900 mb-3">
                        Nutrition (per serving)
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                        <NutritionBadge
                            label="Calories"
                            value={generatedRecipe.nutrition.calories}
                            unit="kcal"
                        />
                        <NutritionBadge
                            label="Protein"
                            value={generatedRecipe.nutrition.protein}
                            unit="g"
                        />
                        <NutritionBadge
                            label="Carbs"
                            value={generatedRecipe.nutrition.carbs}
                            unit="g"
                        />
                        <NutritionBadge
                            label="Fats"
                            value={generatedRecipe.nutrition.fats}
                            unit="g"
                        />
                        <NutritionBadge
                            label="Fiber"
                            value={generatedRecipe.nutrition.fiber}
                            unit="g"
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default GeneratedRecipeNutrition
