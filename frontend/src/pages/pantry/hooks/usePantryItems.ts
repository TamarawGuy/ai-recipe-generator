import { useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'

import api from '../../../services/api'

import type { PantryItem } from '../../../types'

export const usePantryItems = () => {
    const [items, setItems] = useState<PantryItem[]>([])
    const [loading, setLoading] = useState(false)

    const fetchPantryItems = useCallback(async () => {
        try {
            const resp = await api.get('/pantry')
            setItems(resp.data.data.items)
        } catch (err) {
            console.error('Failed to load pantry items: ', err)
        } finally {
            setLoading(false)
        }
    }, [])

    const deletePantryItem = async (id: string) => {
        if (!confirm('Are you sure you want to delete this item?')) return

        try {
            await api.delete(`/pantry/${id}`)
            setItems((prev) => prev.filter((item) => item.id !== id))
            toast.success('Item deleted')
        } catch (err) {
            console.error(`Failed to delete item: `, err)
            toast.error('Failed to delete item')
        }
    }

    useEffect(() => {
        fetchPantryItems()
    }, [fetchPantryItems])

    return { items, loading, deletePantryItem, refetch: fetchPantryItems }
}
