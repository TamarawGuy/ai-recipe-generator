import { AlertCircle } from 'lucide-react'
import type { PantryItem } from '../../../types'

type ExpiringSoonItemsProps = {
    expiringItems: PantryItem[]
}

const ExpiringSoonItems = ({ expiringItems }: ExpiringSoonItemsProps) => {
    if (expiringItems.length === 0) {
        return null
    }

    return (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                    <h3 className="font-medium text-amber-900">
                        Items Expiring Soon
                    </h3>
                    <p className="text-sm text-amber-700 mt-1">
                        {expiringItems.length} item
                        {expiringItems.length > 1 ? 's' : ''} expiring within 7
                        days
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ExpiringSoonItems
