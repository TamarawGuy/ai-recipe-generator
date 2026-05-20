import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Trash2 } from 'lucide-react'

import api from '../../../services/api'

import type { RecipeDetails } from '../../../types'

type RecipeInfoProps = {
    recipe: RecipeDetails
}

const RecipeInfo = ({ recipe }: RecipeInfoProps) => {
    const { id } = useParams()
    const navigate = useNavigate()

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this recipe?')) return

        try {
            await api.delete(`/recipes/${id}`)
            toast.success('Recipe deleted')
            navigate('/recipes')
        } catch {
            toast.error('Failed to delete recipe')
        }
    }

    return (
        <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {recipe.name}
                </h1>
                {recipe.description && (
                    <p className="text-gray-600 text-lg">
                        {recipe.description}
                    </p>
                )}
            </div>
            <button
                onClick={handleDelete}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
                <Trash2 className="w-5 h-5" />
            </button>
        </div>
    )
}

export default RecipeInfo
