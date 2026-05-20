import { useState } from 'react'

import Navbar from '../../shared/Navbar'
import Loading from '../../shared/Loading'
import AddItemModal from './components/AddItemModal'

import type { ShoppingListItem } from '../../types.d'
import { useShoppingList } from './hooks/useShoppingList'
import ListAndActions from './sections/ListAndActions'

const ShoppingList = () => {
    const { items, setItems, groupedItems, organizeByCategory, loading } =
        useShoppingList()
    const [showAddModal, setShowAddModal] = useState(false)

    if (loading) {
        return <Loading />
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <ListAndActions
                items={items}
                setItems={setItems}
                groupedItems={groupedItems}
                setShowAddModal={setShowAddModal}
                organizeByCategory={organizeByCategory}
            />

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
