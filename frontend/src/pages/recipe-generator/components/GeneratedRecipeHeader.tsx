import { Clock, Users } from 'lucide-react'

import type { GeneratedRecipe } from '../../../types'

type GeneratedRecipeHeaderProps = {
    generatedRecipe: GeneratedRecipe
}

const GeneratedRecipeHeader = ({
    generatedRecipe,
}: GeneratedRecipeHeaderProps) => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {generatedRecipe.name}
            </h2>
            <p className="text-gray-600">{generatedRecipe.description}</p>

            <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                    {generatedRecipe.cuisineType}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium capitalize">
                    {generatedRecipe.difficulty}
                </span>
                {generatedRecipe.dietaryTags?.map((tag) => (
                    <span
                        key={tag}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>
                        {generatedRecipe.prepTime + generatedRecipe.cookTime}{' '}
                        mins
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{generatedRecipe.servings} servings</span>
                </div>
            </div>
        </div>
    )
}

export default GeneratedRecipeHeader
