import { Plus, ShoppingCart, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

import api from '../../../services/api'

import type { ShoppingListItem } from '../../../types'

type ShoppingListActionsProps = {
    checkedCount: number
    totalCount: number
    items: ShoppingListItem[]
    setItems: React.Dispatch<React.SetStateAction<ShoppingListItem[]>>
    setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>
    organizeByCategory: (itemsList: ShoppingListItem[]) => void
}

const ShoppingListActions = ({
    checkedCount,
    totalCount,
    items,
    setItems,
    setShowAddModal,
    organizeByCategory,
}: ShoppingListActionsProps) => {
    const handleAddToPantry = async () => {
        const checkedCount = items.filter((item) => item.is_checked).length
        if (checkedCount === 0) {
            toast.error('No items checked')
            return
        }

        if (!confirm(`Add ${checkedCount} checked items to pantry?`)) return

        try {
            await api.post('/shopping-list/add-to-pantry')
            const updatedItems = items.filter((item) => !item.is_checked)
            setItems(updatedItems)
            organizeByCategory(updatedItems)
        } catch (err) {
            console.error('Failed to add items to pantry: ', err)
            toast.error('Failed to add items to pantry')
        }
    }

    const handleClearChecked = async () => {
        if (!confirm('Remove all checked items?')) return

        try {
            await api.delete('/shopping-list/clear/checked')
            const updatedItems = items.filter((item) => !item.is_checked)
            setItems(updatedItems)
            toast.success('Checked items cleared')
        } catch (err) {
            console.error('Failed to clear items: ', err)
            toast.error('Failed to clear items')
        }
    }

    if (totalCount <= 0) return null

    return (
        <div className="flex flex-wrap gap-3 mb-6">
            <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-lg font-medium transition-colors cursor-pointer"
            >
                <Plus className="w-5 h-5" />
                Add Item
            </button>
            {checkedCount > 0 && (
                <>
                    <button
                        onClick={handleAddToPantry}
                        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg font-medium transition-colors cursor-pointer"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        Add to Pantry ({checkedCount})
                    </button>
                    <button
                        onClick={handleClearChecked}
                        className="flex items-center gap-2 border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2.5 rounded-lg font-medium transition-colors cursor-pointer"
                    >
                        <Trash2 className="w-5 h-5" />
                        Clear Checked
                    </button>
                </>
            )}
        </div>
    )
}

export default ShoppingListActions
