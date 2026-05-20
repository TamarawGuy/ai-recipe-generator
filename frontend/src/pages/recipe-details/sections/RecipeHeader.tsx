import RecipeMetaInfo from '../components/RecipeMetaInfo'
import RecipeTags from '../components/RecipeTags'
import RecipeInfo from '../components/RecipeInfo'

import type { RecipeDetails } from '../../../types'

type RecipeHeaderProps = {
    recipe: RecipeDetails | null
}

const RecipeHeader = ({ recipe }: RecipeHeaderProps) => {
    if (!recipe) return null

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
            {/* Recipe Info */}
            <RecipeInfo recipe={recipe} />

            {/* Tags */}
            <RecipeTags recipe={recipe} />

            {/* Meta Info */}
            <RecipeMetaInfo recipe={recipe} />
        </div>
    )
}

export default RecipeHeader
