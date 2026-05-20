import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

import api from '../../../services/api'

import type { GroupedShoppingListItem, ShoppingListItem } from '../../../types'

export const useShoppingList = () => {
    const [items, setItems] = useState<ShoppingListItem[]>([])
    const [groupedItems, setGroupedItems] = useState<
        Record<string, ShoppingListItem[]>
    >({})
    const [loading, setLoading] = useState(true)

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

    return { items, setItems, groupedItems, organizeByCategory, loading }
}
