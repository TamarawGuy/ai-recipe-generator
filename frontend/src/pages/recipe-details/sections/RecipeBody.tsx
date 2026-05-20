import RecipeIngredients from '../components/RecipeIngredients'
import RecipeInstructions from '../components/RecipeInstructions'

import type { RecipeDetails } from '../../../types'

type RecipeBodyProps = {
    recipe: RecipeDetails | null
    servings: number
    setServings: React.Dispatch<React.SetStateAction<number>>
}

const RecipeBody = ({ recipe, servings, setServings }: RecipeBodyProps) => {
    if (!recipe) return null

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Ingredients Section */}
            <RecipeIngredients
                recipe={recipe}
                servings={servings}
                setServings={setServings}
            />

            {/* Instructions Section */}
            <RecipeInstructions recipe={recipe} />
        </div>
    )
}

export default RecipeBody
