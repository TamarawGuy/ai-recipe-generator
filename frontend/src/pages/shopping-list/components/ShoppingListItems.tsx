import toast from 'react-hot-toast'
import { Plus } from 'lucide-react'

import api from '../../../services/api'
import EmptyShoppingList from './EmptyShoppingList'
import type { ShoppingListItem } from '../../../types'
import ShoppingListItemComp from './ShoppingListItemComp'

type ShoppingListItemsProps = {
    totalCount: number
    groupedItems: Record<string, ShoppingListItem[]>
    items: ShoppingListItem[]
    setItems: React.Dispatch<React.SetStateAction<ShoppingListItem[]>>
    organizeByCategory: (itemsList: ShoppingListItem[]) => void
    setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ShoppingListItems = ({
    totalCount,
    groupedItems,
    items,
    setItems,
    organizeByCategory,
    setShowAddModal,
}: ShoppingListItemsProps) => {
    const handleToggleChecked = async (id: string) => {
        const updatedItems = items.map((item) =>
            item.id === id ? { ...item, is_checked: !item.is_checked } : item,
        )
        setItems(updatedItems)
        organizeByCategory(updatedItems)

        try {
            await api.put(`/shopping-list/${id}/toggle`)
            const updatedItems = items.map((item) =>
                item.id === id
                    ? { ...item, is_checked: !item.is_checked }
                    : item,
            )
            setItems(updatedItems)
            organizeByCategory(updatedItems)
        } catch (err) {
            console.error('Failed to update item: ', err)
            toast.error('Failed to update item')
        }
    }

    const handleDeleteItem = async (id: string) => {
        try {
            await api.delete(`/shopping-list/${id}`)
            const updatedItems = items.filter((item) => item.id !== id)
            setItems(updatedItems)
            organizeByCategory(updatedItems)
        } catch (err) {
            console.error('Failed to delete item: ', err)
            toast.error('Failed to delete item')
        }
    }

    if (totalCount <= 0) {
        return (
            <EmptyShoppingList>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors cursor-pointer"
                >
                    <Plus className="w-5 h-5" />
                    Add First Item
                </button>
            </EmptyShoppingList>
        )
    }

    return (
        <div className="space-y-6">
            {Object.entries(groupedItems).map(([category, categoryItems]) => (
                <div
                    key={category}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                >
                    <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                        <h2 className="font-semibold text-gray-900">
                            {category}
                        </h2>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {categoryItems.map((item: ShoppingListItem) => (
                            <ShoppingListItemComp
                                key={item.id}
                                item={item}
                                onToggle={handleToggleChecked}
                                onDelete={handleDeleteItem}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ShoppingListItems
