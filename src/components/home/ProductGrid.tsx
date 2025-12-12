import { Typography } from '@/components/ui/Typography'
import { IProduct } from '@/types/products.interface'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { ProductCard } from './ProductCard'

interface ProductGridProps {
	products: IProduct[]
	isLoading: boolean
	error: Error | null
}

export const ProductGrid = ({ products, isLoading, error }: ProductGridProps) => {
	if (isLoading) {
		return (
			<View className='flex-1 justify-center items-center py-10'>
				<ActivityIndicator size='large' color='#2563EB' />
			</View>
		)
	}

	if (error) {
		return (
			<View className='flex-1 justify-center items-center'>
				<Typography variant='error'>Failed to load products</Typography>
			</View>
		)
	}

	return (
		<FlatList
			data={products}
			keyExtractor={item => item.id.toString()}
			numColumns={2}
			columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 10 }}
			contentContainerStyle={{ paddingBottom: 20 }}
			renderItem={({ item }) => (
				<ProductCard product={item} onPress={id => console.log('Open product', id)} />
			)}
			ListEmptyComponent={
				<View className='mt-10 items-center'>
					<Typography>No products found</Typography>
				</View>
			}
		/>
	)
}
