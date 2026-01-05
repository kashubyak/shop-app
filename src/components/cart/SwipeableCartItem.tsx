import { View, Image, TouchableOpacity, useWindowDimensions } from 'react-native'
import { Typography } from '@/components/ui/Typography'
import { Ionicons } from '@expo/vector-icons'
import { CartItem } from '@/store/useCartStore'
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	runOnJS,
} from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

const SWIPE_THRESHOLD = -80
const DELETE_BUTTON_WIDTH = 80

interface SwipeableCartItemProps {
	item: CartItem
	onUpdateQuantity: (productId: number, quantity: number) => void
	onRemove: (productId: number) => void
}

export const SwipeableCartItem = ({
	item,
	onUpdateQuantity,
	onRemove,
}: SwipeableCartItemProps) => {
	const { width: SCREEN_WIDTH } = useWindowDimensions()
	const translateX = useSharedValue(0)
	const itemOpacity = useSharedValue(1)

	const panGesture = Gesture.Pan()
		.onUpdate((e) => {
			// Only allow swiping left (negative values)
			if (e.translationX < 0) {
				translateX.value = Math.max(e.translationX, -DELETE_BUTTON_WIDTH)
			}
		})
		.onEnd((e) => {
			// If swiped past threshold, trigger delete
			if (e.translationX < SWIPE_THRESHOLD) {
				translateX.value = withSpring(-SCREEN_WIDTH)
				itemOpacity.value = withSpring(0, undefined, () => {
					runOnJS(onRemove)(item.product.id)
				})
			} else {
				// Snap back to original position
				translateX.value = withSpring(0)
			}
		})

	const animatedCardStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: translateX.value }],
			opacity: itemOpacity.value,
		}
	})

	const animatedDeleteButtonStyle = useAnimatedStyle(() => {
		return {
			opacity: translateX.value < -20 ? 1 : 0,
		}
	})

	const handleRemove = () => {
		onRemove(item.product.id)
	}

	return (
		<View className='mb-4 overflow-hidden'>
			{/* Delete Button Background */}
			<View className='absolute right-0 top-0 bottom-0 justify-center items-center' style={{ width: DELETE_BUTTON_WIDTH }}>
				<Animated.View style={animatedDeleteButtonStyle}>
					<TouchableOpacity
						onPress={handleRemove}
						className='bg-red-500 rounded-full p-4'
						activeOpacity={0.7}
					>
						<Ionicons name='trash' size={24} color='white' />
					</TouchableOpacity>
				</Animated.View>
			</View>

			{/* Swipeable Card */}
			<GestureDetector gesture={panGesture}>
				<Animated.View
					style={animatedCardStyle}
					className='bg-card rounded-xl p-4 border border-border flex-row'
				>
					{/* Product Image */}
					<View className='w-20 h-20 bg-white rounded-lg items-center justify-center mr-4'>
						<Image
							source={{ uri: item.product.image }}
							className='w-full h-full'
							resizeMode='contain'
						/>
					</View>

					{/* Product Info */}
					<View className='flex-1'>
						<Typography
							variant='body'
							className='font-semibold text-foreground mb-1'
							numberOfLines={2}
						>
							{item.product.title}
						</Typography>
						<Typography variant='body' className='text-primary font-bold text-lg mb-3'>
							${item.product.price.toFixed(2)}
						</Typography>

						{/* Quantity Controls */}
						<View className='flex-row items-center justify-between'>
							<View className='flex-row items-center bg-muted rounded-lg'>
								<TouchableOpacity
									onPress={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
									className='w-10 h-10 items-center justify-center'
									activeOpacity={0.7}
								>
									<Ionicons name='remove' size={20} color='#1f2937' />
								</TouchableOpacity>

								<View className='w-12 items-center justify-center'>
									<Typography variant='body' className='font-semibold text-foreground'>
										{item.quantity}
									</Typography>
								</View>

								<TouchableOpacity
									onPress={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
									className='w-10 h-10 items-center justify-center'
									activeOpacity={0.7}
								>
									<Ionicons name='add' size={20} color='#1f2937' />
								</TouchableOpacity>
							</View>

							{/* Remove Button (fallback for tap) */}
							<TouchableOpacity
								onPress={handleRemove}
								className='p-2'
								activeOpacity={0.7}
							>
								<Ionicons name='trash-outline' size={20} color='#ef4444' />
							</TouchableOpacity>
						</View>
					</View>
				</Animated.View>
			</GestureDetector>
		</View>
	)
}

