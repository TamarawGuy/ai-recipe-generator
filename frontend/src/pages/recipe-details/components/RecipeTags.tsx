import type { RecipeDetails } from '../../../types'

type RecipeTagsProps = {
    recipe: RecipeDetails
}

const RecipeTags = ({ recipe }: RecipeTagsProps) => {
    return (
        <div className="flex flex-wrap gap-2 mb-6">
            {recipe.cuisine_type && (
                <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                    {recipe.cuisine_type}
                </span>
            )}
            {recipe.difficulty && (
                <span
                    className={`px-3 py-1.5 rounded-full text-sm font-medium capitalize ${
                        recipe.difficulty === 'easy'
                            ? 'bg-green-100 text-green-700'
                            : recipe.difficulty === 'medium'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                    }`}
                >
                    {recipe.difficulty}
                </span>
            )}
            {recipe.dietary_tags &&
                recipe.dietary_tags.map((tag) => (
                    <span
                        key={tag}
                        className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                    >
                        {tag}
                    </span>
                ))}
        </div>
    )
}

export default RecipeTags
