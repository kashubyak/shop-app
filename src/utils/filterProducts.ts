import { IProduct } from '@/types/products.interface'

/**
 * Filters products by search query
 * Searches in title, description, and category
 */
export const filterProducts = (products: IProduct[], searchQuery: string): IProduct[] => {
	if (!searchQuery.trim()) {
		return products
	}

	const query = searchQuery.toLowerCase().trim()

	return products.filter(product => {
		const titleMatch = product.title.toLowerCase().includes(query)
		const descriptionMatch = product.description.toLowerCase().includes(query)
		const categoryMatch = product.category.toLowerCase().includes(query)

		return titleMatch || descriptionMatch || categoryMatch
	})
}

