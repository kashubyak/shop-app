import { getCategories, getProducts, getProductsByCategory } from '@/service/products'
import { useQuery } from '@tanstack/react-query'

export const useCategories = () => {
	return useQuery({
		queryKey: ['categories'],
		queryFn: getCategories,
		staleTime: 1000 * 60 * 60 * 24,
	})
}

export const useProducts = (category: string) => {
	return useQuery({
		queryKey: ['products', category],
		queryFn: () => (category === 'all' ? getProducts() : getProductsByCategory(category)),
	})
}
