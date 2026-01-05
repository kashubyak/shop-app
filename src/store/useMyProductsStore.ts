import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { IProduct } from '../types/products.interface'

interface MyProductsState {
	products: IProduct[]
	isLoading: boolean
	addProduct: (product: Omit<IProduct, 'id'>) => Promise<void>
	deleteProduct: (id: number) => Promise<void>
	loadProducts: () => Promise<void>
}

// Storage key for persisting my products
const MY_PRODUCTS_STORAGE_KEY = 'my_products'

// Generate unique ID for local products (using negative numbers to avoid conflicts with API products)
const generateId = (existingProducts: IProduct[]): number => {
	const maxId = existingProducts.length > 0 
		? Math.max(...existingProducts.map(p => Math.abs(p.id)))
		: 0
	return -(maxId + 1)
}

export const useMyProductsStore = create<MyProductsState>((set, get) => ({
	products: [],
	isLoading: true,

	addProduct: async (productData: Omit<IProduct, 'id'>) => {
		const currentProducts = get().products
		const newProduct: IProduct = {
			...productData,
			id: generateId(currentProducts),
		}
		const newProducts = [...currentProducts, newProduct]

		try {
			await AsyncStorage.setItem(MY_PRODUCTS_STORAGE_KEY, JSON.stringify(newProducts))
		} catch (error) {
			// Failed to save products
		}

		set({ products: newProducts })
	},

	deleteProduct: async (id: number) => {
		const currentProducts = get().products
		const newProducts = currentProducts.filter(product => product.id !== id)

		try {
			await AsyncStorage.setItem(MY_PRODUCTS_STORAGE_KEY, JSON.stringify(newProducts))
		} catch (error) {
			// Failed to delete product
		}

		set({ products: newProducts })
	},

	loadProducts: async () => {
		try {
			const storedProducts = await AsyncStorage.getItem(MY_PRODUCTS_STORAGE_KEY)
			if (storedProducts) {
				const products: IProduct[] = JSON.parse(storedProducts)
				set({ products, isLoading: false })
			} else {
				set({ isLoading: false })
			}
		} catch (error) {
			set({ isLoading: false })
		}
	},
}))

