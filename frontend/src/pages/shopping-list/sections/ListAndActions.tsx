import Header from '../../../shared/Header'

import ShoppingListActions from '../components/ShoppingListActions'
import ShoppingListItems from '../components/ShoppingListItems'

import type { ShoppingListItem } from '../../../types'

type ListAndActionsProps = {
    items: ShoppingListItem[]
    setItems: React.Dispatch<React.SetStateAction<ShoppingListItem[]>>
    setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>
    groupedItems: Record<string, ShoppingListItem[]>
    organizeByCategory: (itemsList: ShoppingListItem[]) => void
}

const ListAndActions = ({
    items,
    setItems,
    setShowAddModal,
    groupedItems,
    organizeByCategory,
}: ListAndActionsProps) => {
    const checkedCount = items.filter((item) => item.is_checked).length
    const totalCount = items.length

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <Header
                title="Shopping List"
                subtitle={
                    totalCount > 0
                        ? `${checkedCount} of ${totalCount} items checked`
                        : 'Your shopping list is empty'
                }
            />

            {/* Actions */}
            <ShoppingListActions
                checkedCount={checkedCount}
                totalCount={totalCount}
                items={items}
                setItems={setItems}
                setShowAddModal={setShowAddModal}
                organizeByCategory={organizeByCategory}
            />

            {/* Shopping List */}
            <ShoppingListItems
                totalCount={totalCount}
                items={items}
                setItems={setItems}
                groupedItems={groupedItems}
                organizeByCategory={organizeByCategory}
                setShowAddModal={setShowAddModal}
            />
        </div>
    )
}

export default ListAndActions
