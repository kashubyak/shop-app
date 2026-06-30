import { SearchBar } from '@/components/home/SearchBar'
import { CategoryList } from '@/components/home/CategoryList'
import { ProductGrid } from '@/components/home/ProductGrid'
import { useCategories, useProducts } from '@/hooks/useProducts'
import { useDebounce } from '@/hooks/useDebounce'
import { filterProducts } from '@/utils/filterProducts'
import { useState, useMemo } from 'react'
import { View } from 'react-native'

export default function HomeScreen() {
	const [activeCategory, setActiveCategory] = useState('all')
	const [searchQuery, setSearchQuery] = useState('')
	const debouncedSearchQuery = useDebounce(searchQuery, 300)

	const { data: categories = [] } = useCategories()

	const {
		data: products = [],
		isLoading: isProductsLoading,
		error: productsError,
	} = useProducts(activeCategory)

	// Filter products on client side by search query
	const filteredProducts = useMemo(() => {
		return filterProducts(products, debouncedSearchQuery)
	}, [products, debouncedSearchQuery])

	const handleClearSearch = () => {
		setSearchQuery('')
	}

	const isSearchActive = debouncedSearchQuery.trim().length > 0

	return (
		<View className='flex-1 bg-background'>
			<SearchBar
				value={searchQuery}
				onChangeText={setSearchQuery}
				onClear={handleClearSearch}
			/>

			{!isSearchActive && (
				<CategoryList
					categories={categories}
					activeCategory={activeCategory}
					onSelectCategory={setActiveCategory}
				/>
			)}

			<ProductGrid
				products={filteredProducts}
				isLoading={isProductsLoading}
				error={productsError}
			/>
		</View>
	)
}
