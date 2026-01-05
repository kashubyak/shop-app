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

function ProductDetailsScreen() {
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
			<ScrollView 
				className='flex-1 bg-background'
				showsVerticalScrollIndicator={false}
			>
				{/* Header with back button */}
				<View className='flex-row items-center justify-between px-4 pt-2 pb-4'>
					<TouchableOpacity
						onPress={() => router.back()}
						className='w-12 h-12 rounded-full items-center justify-center bg-white shadow-md border border-gray-100'
						activeOpacity={0.8}
					>
						<Ionicons name='arrow-back' size={22} color='#1f2937' />
					</TouchableOpacity>
				</View>

				{/* Large product image with shadow */}
				<View className='w-full h-96 bg-white items-center justify-center mb-6 px-4'>
					<View className='w-full h-full rounded-2xl bg-white shadow-lg overflow-hidden'>
						<Image
							source={{ uri: product.image }}
							className='w-full h-full'
							resizeMode='contain'
						/>
					</View>
				</View>

				{/* Content */}
				<View className='px-6 pb-8'>
					{/* Category badge */}
					<View className='mb-3'>
						<View className='self-start px-3 py-1.5 bg-primary/10 rounded-full'>
							<Typography variant='body' className='text-primary font-semibold text-xs uppercase tracking-wide'>
								{product.category}
							</Typography>
						</View>
					</View>

					{/* Title */}
					<Typography variant='h1' className='mb-4 text-2xl font-bold leading-tight'>
						{product.title}
					</Typography>

					{/* Rating and reviews */}
					<View className='mb-6 flex-row items-center gap-3'>
						<Rating rating={product.rating.rate} size={20} />
						<Typography variant='body' className='text-muted-foreground text-sm'>
							{product.rating.rate.toFixed(1)} • {product.rating.count} reviews
						</Typography>
					</View>

					{/* Price */}
					<View className='mb-6'>
						<Typography variant='h1' className='text-primary text-3xl font-bold'>
							${product.price.toFixed(2)}
						</Typography>
					</View>

					{/* Divider */}
					<View className='h-px bg-border mb-6' />

					{/* Description */}
					<View className='mb-8'>
						<Typography variant='body' className='text-foreground text-base leading-7'>
							{product.description}
						</Typography>
					</View>

					{/* Add to cart button with animation */}
					<Animated.View style={animatedButtonStyle}>
						<Button
							title={isAddingToCart ? 'Adding to Cart...' : 'Add to Cart'}
							variant='primary'
							isLoading={isAddingToCart}
							onPress={handleAddToCart}
							className='w-full shadow-lg'
							style={{ opacity: 1 }}
						/>
					</Animated.View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

ProductDetailsScreen.options = {
	headerShown: false,
	presentation: 'card' as const,
	animation: 'slide_from_right' as const,
}

export default ProductDetailsScreen
