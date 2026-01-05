import { useState, useEffect, useLayoutEffect } from 'react'
import { View, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Typography } from '@/components/ui/Typography'
import { ProductCard } from '@/components/home/ProductCard'
import { CreateProductForm } from '@/components/products/CreateProductForm'
import { useMyProductsStore } from '@/store/useMyProductsStore'
import { useRouter, useNavigation } from 'expo-router'
import { IProduct } from '@/types/products.interface'

export default function MyProductsScreen() {
	const [showCreateForm, setShowCreateForm] = useState(false)
	const { products, isLoading, loadProducts, deleteProduct } = useMyProductsStore()
	const router = useRouter()
	const navigation = useNavigation()

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
					onPress={() => setShowCreateForm(true)}
					style={{ marginRight: 16 }}
					activeOpacity={0.7}
				>
					<Ionicons name='add' size={24} color='#2563EB' />
				</TouchableOpacity>
			),
		})
	}, [navigation])

	useEffect(() => {
		loadProducts()
	}, [])

	const handleProductPress = (id: number) => {
		router.push(`/product/${id}`)
	}

	const handleDelete = (product: IProduct) => {
		Alert.alert(
			'Delete Product',
			`Are you sure you want to delete "${product.title}"?`,
			[
				{
					text: 'Cancel',
					style: 'cancel',
				},
				{
					text: 'Delete',
					style: 'destructive',
					onPress: () => deleteProduct(product.id),
				},
			]
		)
	}

	if (showCreateForm) {
		return (
			<View className='flex-1 bg-background'>
				<View className='flex-row items-center justify-between px-4 py-3 border-b border-border'>
					<TouchableOpacity onPress={() => setShowCreateForm(false)}>
						<Ionicons name='arrow-back' size={24} color='gray' />
					</TouchableOpacity>
					<Typography variant='h2'>Create Product</Typography>
					<View style={{ width: 24 }} />
				</View>
				<CreateProductForm
					onSuccess={() => {
						setShowCreateForm(false)
						loadProducts()
					}}
				/>
			</View>
		)
	}

	if (isLoading) {
		return (
			<View className='flex-1 justify-center items-center bg-background'>
				<ActivityIndicator size='large' color='#2563EB' />
			</View>
		)
	}

	if (products.length === 0) {
		return (
			<View className='flex-1 justify-center items-center bg-background px-6'>
				<Ionicons name='cube-outline' size={80} color='#9ca3af' />
				<Typography variant='h1' className='mt-6 mb-2 text-center'>
					No products yet
				</Typography>
				<Typography variant='body' className='text-muted-foreground text-center'>
					Tap the + button to create your first product
				</Typography>
			</View>
		)
	}

	return (
		<View className='flex-1 bg-background'>
			<FlatList
				data={products}
				keyExtractor={item => item.id.toString()}
				numColumns={2}
				columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 10 }}
				contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }) => (
					<ProductCard 
						product={item} 
						onPress={handleProductPress}
						onDelete={(id) => handleDelete(item)}
					/>
				)}
			/>
		</View>
	)
}

