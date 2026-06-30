import { CategoryList } from '@/components/home/CategoryList'
import { ProductGrid } from '@/components/home/ProductGrid'
import { useCategories, useProducts } from '@/hooks/useProducts'
import { useState } from 'react'
import { View } from 'react-native'

export default function HomeScreen() {
	const [activeCategory, setActiveCategory] = useState('all')

	const { data: categories = [] } = useCategories()

	const {
		data: products = [],
		isLoading: isProductsLoading,
		error: productsError,
	} = useProducts(activeCategory)

	return (
		<View className='flex-1 bg-background'>
			<CategoryList
				categories={categories}
				activeCategory={activeCategory}
				onSelectCategory={setActiveCategory}
			/>

			<ProductGrid
				products={products}
				isLoading={isProductsLoading}
				error={productsError}
			/>
		</View>
	)
}
