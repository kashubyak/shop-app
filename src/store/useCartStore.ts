import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { IProduct } from '../types/products.interface'

export interface CartItem {
	product: IProduct
	quantity: number
}

interface CartState {
	items: CartItem[]
	isLoading: boolean
	totalPrice: number
	totalItems: number
	addItem: (product: IProduct) => Promise<void>
	removeItem: (productId: number) => Promise<void>
	updateQuantity: (productId: number, quantity: number) => Promise<void>
	clearCart: () => Promise<void>
	loadCart: () => Promise<void>
}

// Storage key for persisting cart data
const CART_STORAGE_KEY = 'cart_items'

/**
 * Calculates total price and total items count from cart items
 * @param items - Array of cart items
 * @returns Object with totalPrice and totalItems
 */
const calculateTotals = (items: CartItem[]) => {
	const totalPrice = items.reduce(
		(sum, item) => sum + item.product.price * item.quantity,
		0
	)
	const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
	return { totalPrice, totalItems }
}

export const useCartStore = create<CartState>((set, get) => ({
	items: [],
	isLoading: true,
	totalPrice: 0,
	totalItems: 0,

	addItem: async (product: IProduct) => {
		const currentItems = get().items
		const existingItemIndex = currentItems.findIndex(
			item => item.product.id === product.id
		)

		let newItems: CartItem[]

		if (existingItemIndex >= 0) {
			// If item already exists in cart, increment quantity
			newItems = currentItems.map((item, index) =>
				index === existingItemIndex
					? { ...item, quantity: item.quantity + 1 }
					: item
			)
		} else {
			newItems = [...currentItems, { product, quantity: 1 }]
		}

		const { totalPrice, totalItems } = calculateTotals(newItems)

		try {
			await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newItems))
		} catch (error) {
			console.error('Failed to save cart to storage:', error)
		}

		set({ items: newItems, totalPrice, totalItems })
	},

	removeItem: async (productId: number) => {
		const currentItems = get().items
		const newItems = currentItems.filter(item => item.product.id !== productId)

		const { totalPrice, totalItems } = calculateTotals(newItems)

		// Save to AsyncStorage
		try {
			await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newItems))
		} catch (error) {
			console.error('Failed to save cart to storage:', error)
		}

		set({ items: newItems, totalPrice, totalItems })
	},

	updateQuantity: async (productId: number, quantity: number) => {
		// If quantity is 0 or less, remove item from cart
		if (quantity <= 0) {
			await get().removeItem(productId)
			return
		}

		const currentItems = get().items
		const newItems = currentItems.map(item =>
			item.product.id === productId ? { ...item, quantity } : item
		)

		const { totalPrice, totalItems } = calculateTotals(newItems)

		// Save to AsyncStorage
		try {
			await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newItems))
		} catch (error) {
			console.error('Failed to save cart to storage:', error)
		}

		set({ items: newItems, totalPrice, totalItems })
	},

	clearCart: async () => {
		try {
			await AsyncStorage.removeItem(CART_STORAGE_KEY)
		} catch (error) {
			console.error('Failed to clear cart from storage:', error)
		}

		set({ items: [], totalPrice: 0, totalItems: 0 })
	},

	loadCart: async () => {
		try {
			const storedCart = await AsyncStorage.getItem(CART_STORAGE_KEY)
			if (storedCart) {
				const items: CartItem[] = JSON.parse(storedCart)
				const { totalPrice, totalItems } = calculateTotals(items)
				set({ items, totalPrice, totalItems, isLoading: false })
			} else {
				set({ isLoading: false })
			}
		} catch (error) {
			console.error('Failed to load cart from storage:', error)
			set({ isLoading: false })
		}
	},
}))

