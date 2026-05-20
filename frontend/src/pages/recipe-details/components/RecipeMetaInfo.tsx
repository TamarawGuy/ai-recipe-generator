import { Clock } from 'lucide-react'

import type { RecipeDetails } from '../../../types'

type RecipeMetaInfoProps = {
    recipe: RecipeDetails
}

const RecipeMetaInfo = ({ recipe }: RecipeMetaInfoProps) => {
    const totalTime = (recipe.prep_time || 0) + (recipe.cook_time || 0)

    return (
        <div className="flex flex-wrap gap-6 text-gray-600">
            <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="font-medium">{totalTime} minutes</span>
            </div>
            {recipe.prep_time && (
                <div className="text-sm">Prep: {recipe.prep_time} min</div>
            )}
            {recipe.cook_time && (
                <div className="text-sm">Cook: {recipe.cook_time} min</div>
            )}
        </div>
    )
}

export default RecipeMetaInfo
