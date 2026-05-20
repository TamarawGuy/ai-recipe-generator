import type { GeneratedRecipe } from '../../../types'

type GeneratedRecipeInstructionsProps = {
    generatedRecipe: GeneratedRecipe
}

const GeneratedRecipeInstructions = ({
    generatedRecipe,
}: GeneratedRecipeInstructionsProps) => {
    return (
        <div>
            <h3 className="font-semibold text-gray-900 mb-3">Instructions</h3>
            <ol className="space-y-3">
                {generatedRecipe.instructions?.map((step, index) => (
                    <li key={index} className="flex gap-3">
                        <span className="shrink-0 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                        </span>
                        <span className="text-gray-700 pt-0.5">{step}</span>
                    </li>
                ))}
            </ol>
        </div>
    )
}

export default GeneratedRecipeInstructions
