import { X, Calendar } from 'lucide-react'
import { format } from 'date-fns'
import type { PantryItem } from '../../../types'

type PantryItemCardProps = {
    item: PantryItem
    onDelete: (id: string) => void
    isExpiring: boolean
}

const PantryItemCard = ({
    item,
    onDelete,
    isExpiring,
}: PantryItemCardProps) => {
    const isExpired =
        item.expiry_date && new Date(item.expiry_date) < new Date()

    return (
        <div
            className={`bg-white rounded-lg border p-4 hover:shadow-md transition-shadow ${
                isExpiring ? 'border-amber-300' : 'border-gray-200'
            }`}
        >
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500 capitalize">
                        {item.category}
                    </p>
                </div>
                <button
                    onClick={() => onDelete(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Quantity:</span>
                    <span className="font-medium text-gray-900">
                        {item.quantity} {item.unit}
                    </span>
                </div>

                {item.expiry_date && (
                    <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span
                            className={`${isExpired ? 'text-red-600 font-medium' : isExpiring ? 'text-amber-600 font-medium' : 'text-gray-600'}`}
                        >
                            {isExpired ? 'Expired' : 'Expires'}:{' '}
                            {format(new Date(item.expiry_date), 'MMM dd, yyyy')}
                        </span>
                    </div>
                )}

                {item.is_running_low && (
                    <span className="inline-block px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded">
                        Running Low
                    </span>
                )}
            </div>
        </div>
    )
}

export default PantryItemCard
