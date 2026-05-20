import type { GeneratedRecipe } from '../../../types'

type GeneratedRecipeIngredientsProps = {
    generatedRecipe: GeneratedRecipe
}

const GeneratedRecipeIngredients = ({
    generatedRecipe,
}: GeneratedRecipeIngredientsProps) => {
    return (
        <div>
            <h3 className="font-semibold text-gray-900 mb-3">Ingredients</h3>
            <ul className="space-y-2">
                {generatedRecipe.ingredients?.map((ing, index) => (
                    <li
                        key={index}
                        className="flex items-center gap-2 text-gray-700"
                    >
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                        {ing.quantity} {ing.unit} {ing.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default GeneratedRecipeIngredients
