import type { GeneratedRecipe } from '../../../types'

type GeneratedRecipeCookingTipsProps = {
    generatedRecipe: GeneratedRecipe
}

const GeneratedRecipeCookingTips = ({
    generatedRecipe,
}: GeneratedRecipeCookingTipsProps) => {
    if (!generatedRecipe.cookingTips) return null

    return (
        <>
            {generatedRecipe.cookingTips &&
                generatedRecipe.cookingTips.length > 0 && (
                    <div className="bg-emerald-50 rounded-lg p-4">
                        <h3 className="font-semibold text-emerald-900 mb-2">
                            💡 Cooking Tips
                        </h3>
                        <ul className="space-y-1">
                            {generatedRecipe.cookingTips.map((tip, index) => (
                                <li
                                    key={index}
                                    className="text-sm text-emerald-800"
                                >
                                    • {tip}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
        </>
    )
}

export default GeneratedRecipeCookingTips
