import { useState, useEffect } from 'react'
import { ShoppingCart, Plus, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

import Navbar from '../../shared/Navbar'
import Loading from '../../shared/Loading'
import AddItemModal from './components/AddItemModal'
import ShoppingListItemComp from './components/ShoppingListItemComp'

import api from '../../services/api'

import type { GroupedShoppingListItem, ShoppingListItem } from '../../types.d'
import EmptyShoppingList from './components/EmptyShoppingList'

const ShoppingList = () => {
    const [items, setItems] = useState<ShoppingListItem[]>([])
    const [groupedItems, setGroupedItems] = useState<
        Record<string, ShoppingListItem[]>
    >({})
    const [showAddModal, setShowAddModal] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchShoppingList = async () => {
            try {
                const resp = await api.get('/shopping-list?grouped=true')

                const grouped = resp.data.data.items
                // convert grouped format to flat array
                const flatItems: ShoppingListItem[] = []
                grouped.forEach((group: GroupedShoppingListItem) => {
                    group.items.forEach((item) => {
                        flatItems.push({ ...item, category: group.category })
                    })
                })

                setItems(flatItems)
                organizeByCategory(flatItems)
            } catch (err) {
                console.error('Failed to load shopping list: ', err)
                toast.error('Failed to load shopping list')
            } finally {
                setLoading(false)
            }
        }

        fetchShoppingList()
    }, [])

    const organizeByCategory = (itemsList: ShoppingListItem[]) => {
        const grouped = {} as Record<string, ShoppingListItem[]>
        itemsList.forEach((item: ShoppingListItem) => {
            const category = item.category || 'Other'
            if (!grouped[category]) {
                grouped[category] = []
            }
            grouped[category].push(item)
        })
        setGroupedItems(grouped)
    }

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

    const checkedCount = items.filter((item) => item.is_checked).length
    const totalCount = items.length

    if (loading) {
        return <Loading />
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Shopping List
                    </h1>
                    <p className="text-gray-600 mt-1">
                        {totalCount > 0
                            ? `${checkedCount} of ${totalCount} items checked`
                            : 'Your shopping list is empty'}
                    </p>
                </div>

                {/* Actions */}
                {totalCount > 0 && (
                    <div className="flex flex-wrap gap-3 mb-6">
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-lg font-medium transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                            Add Item
                        </button>
                        {checkedCount > 0 && (
                            <>
                                <button
                                    onClick={handleAddToPantry}
                                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg font-medium transition-colors"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    Add to Pantry ({checkedCount})
                                </button>
                                <button
                                    onClick={handleClearChecked}
                                    className="flex items-center gap-2 border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2.5 rounded-lg font-medium transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                    Clear Checked
                                </button>
                            </>
                        )}
                    </div>
                )}

                {/* Shopping List */}
                {totalCount > 0 ? (
                    <div className="space-y-6">
                        {Object.entries(groupedItems).map(
                            ([category, categoryItems]) => (
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
                                        {categoryItems.map(
                                            (item: ShoppingListItem) => (
                                                <ShoppingListItemComp
                                                    key={item.id}
                                                    item={item}
                                                    onToggle={
                                                        handleToggleChecked
                                                    }
                                                    onDelete={handleDeleteItem}
                                                />
                                            ),
                                        )}
                                    </div>
                                </div>
                            ),
                        )}
                    </div>
                ) : (
                    <EmptyShoppingList>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                            Add First Item
                        </button>
                    </EmptyShoppingList>
                )}
            </div>

            {/* Add Item Modal */}
            {showAddModal && (
                <AddItemModal
                    onClose={() => setShowAddModal(false)}
                    onSuccess={(newItem: ShoppingListItem) => {
                        // Add to local state
                        const updatedItems = [...items, newItem]
                        setItems(updatedItems)
                        organizeByCategory(updatedItems)
                        setShowAddModal(false)
                    }}
                />
            )}
        </div>
    )
}

export default ShoppingList
