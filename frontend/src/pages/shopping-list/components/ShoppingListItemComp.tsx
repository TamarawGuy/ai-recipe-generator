import { Check, X } from 'lucide-react'
import type { ShoppingListItem } from '../../../types'

type ShoppingListItemProps = {
    item: ShoppingListItem
    onToggle: (id: string) => void
    onDelete: (id: string) => void
}

const ShoppingListItemComp = ({
    item,
    onToggle,
    onDelete,
}: ShoppingListItemProps) => {
    return (
        <div className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors group">
            <button onClick={() => onToggle(item.id)} className="shrink-0">
                <div
                    className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                        item.is_checked
                            ? 'bg-emerald-500 border-emerald-500'
                            : 'border-gray-300 hover:border-emerald-500'
                    }`}
                >
                    {item.is_checked && (
                        <Check className="w-4 h-4 text-white" />
                    )}
                </div>
            </button>

            <div className="flex-1 min-w-0">
                <p
                    className={`font-medium ${item.is_checked ? 'line-through text-gray-400' : 'text-gray-900'}`}
                >
                    {item.ingredient_name}
                </p>
                <p
                    className={`text-sm ${item.is_checked ? 'text-gray-400' : 'text-gray-600'}`}
                >
                    {item.quantity} {item.unit}
                    {item.from_meal_plan && (
                        <span className="ml-2 text-xs text-emerald-600">
                            • From meal plan
                        </span>
                    )}
                </p>
            </div>

            <button
                onClick={() => onDelete(item.id)}
                className="shrink-0 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
            >
                <X className="w-5 h-5" />
            </button>
        </div>
    )
}

export default ShoppingListItemComp
