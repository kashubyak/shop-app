import { Button } from '@/components/ui/Button'
import { Rating } from '@/components/ui/Rating'
import { Typography } from '@/components/ui/Typography'
import { useProducts } from '@/hooks/useProducts'
import { IProduct } from '@/types/products.interface'
import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useState } from 'react'
import {
	ActivityIndicator,
	Image,
	ScrollView,
	TouchableOpacity,
	View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated'

export default function ProductDetailsScreen() {
	const { id } = useLocalSearchParams<{ id: string }>()
	const router = useRouter()
	const productId = parseInt(id || '0', 10)

	const { data: products = [], isLoading } = useProducts('all')
	const product = products.find((p: IProduct) => p.id === productId)

	const [isAddingToCart, setIsAddingToCart] = useState(false)
	const scale = useSharedValue(1)
	const opacity = useSharedValue(1)

	const animatedButtonStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: scale.value }],
			opacity: opacity.value,
		}
	})

	const handleAddToCart = async () => {
		if (isAddingToCart) return

		setIsAddingToCart(true)
		// Press animation - scale down and reduce opacity
		scale.value = withSpring(0.92, { damping: 15, stiffness: 300 })
		opacity.value = withTiming(0.8, { duration: 150 })

		// Simulate adding to cart
		await new Promise(resolve => setTimeout(resolve, 600))

		// Return to normal state
		scale.value = withSpring(1, { damping: 15, stiffness: 300 })
		opacity.value = withTiming(1, { duration: 200 })
		setIsAddingToCart(false)
	}

	if (isLoading) {
		return (
			<View className='flex-1 justify-center items-center bg-background'>
				<ActivityIndicator size='large' color='#2563EB' />
			</View>
		)
	}

	if (!product) {
		return (
			<View className='flex-1 justify-center items-center bg-background px-6'>
				<Typography variant='h1' className='mb-4 text-center'>
					Product not found
				</Typography>
				<Button title='Go Back' onPress={() => router.back()} />
			</View>
		)
	}

	return (
		<SafeAreaView className='flex-1 bg-background' edges={['top']}>
			<ScrollView className='flex-1 bg-background'>
				{/* Header with back button */}
				<View className='flex-row items-center justify-between p-4'>
					<TouchableOpacity
						onPress={() => router.back()}
						className='w-10 h-10 rounded-full items-center justify-center bg-card border border-border'
						activeOpacity={0.7}
					>
						<Ionicons name='arrow-back' size={20} color='#000' />
					</TouchableOpacity>
				</View>

				{/* Large product image */}
				<View className='w-full h-80 bg-white items-center justify-center mb-4'>
					<Image
						source={{ uri: product.image }}
						className='w-full h-full'
						resizeMode='contain'
					/>
				</View>

				{/* Content */}
				<View className='px-4 pb-8'>
					{/* Category */}
					<Typography variant='body' className='text-muted-foreground capitalize mb-2'>
						{product.category}
					</Typography>

					{/* Title */}
					<Typography variant='h1' className='mb-3'>
						{product.title}
					</Typography>

					{/* Rating */}
					<View className='mb-4 flex-row items-center gap-2'>
						<Rating rating={product.rating.rate} size={24} />
						<Typography variant='body' className='text-muted-foreground'>
							({product.rating.count} reviews)
						</Typography>
					</View>

					{/* Price */}
					<Typography variant='h1' className='text-primary mb-6'>
						${product.price}
					</Typography>

					{/* Description */}
					<Typography variant='body' className='text-foreground mb-8 leading-6'>
						{product.description}
					</Typography>

					{/* Add to cart button with animation */}
					<Animated.View style={animatedButtonStyle}>
					<Button
						title={isAddingToCart ? 'Adding...' : 'Add to Cart'}
						variant='primary'
						isLoading={isAddingToCart}
						onPress={handleAddToCart}
						className='w-full'
						style={{ opacity: 1 }}
					/>
				</Animated.View>
			</View>
			</ScrollView>
		</SafeAreaView>
	)
}

