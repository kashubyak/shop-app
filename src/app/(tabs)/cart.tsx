import { Button } from '@/components/ui/Button'
import { Typography } from '@/components/ui/Typography'
import { CheckoutModal } from '@/components/checkout/CheckoutModal'
import { SuccessModal } from '@/components/checkout/SuccessModal'
import { CheckoutFormData } from '@/components/checkout/CheckoutForm'
import { useCartStore } from '@/store/useCartStore'
import { Ionicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import {
	ActivityIndicator,
	FlatList,
	Image,
	ScrollView,
	TouchableOpacity,
	View,
} from 'react-native'

export default function CartScreen() {
	const { items, totalPrice, totalItems, isLoading, loadCart, updateQuantity, removeItem, clearCart } =
		useCartStore()
	const [isCheckoutModalVisible, setIsCheckoutModalVisible] = useState(false)
	const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)

	useEffect(() => {
		loadCart()
	}, [])

	const handleCheckout = () => {
		setIsCheckoutModalVisible(true)
	}

	/**
	 * Handles checkout form submission
	 * Simulates API call, clears cart, and shows success message
	 */
	const handleCheckoutSubmit = async (data: CheckoutFormData) => {
		setIsSubmitting(true)
		
		// Simulate API call to submit order
		await new Promise(resolve => setTimeout(resolve, 1500))
		
		// Close checkout modal
		setIsCheckoutModalVisible(false)
		setIsSubmitting(false)
		
		// Show success modal - cart will be cleared when user closes the modal
		setIsSuccessModalVisible(true)
	}

	const handleSuccessClose = async () => {
		setIsSuccessModalVisible(false)
		// Clear cart when user closes success modal
		await clearCart()
	}

	if (isLoading) {
		return (
			<View className='flex-1 justify-center items-center bg-background'>
				<ActivityIndicator size='large' color='#2563EB' />
			</View>
		)
	}

	if (items.length === 0) {
		return (
			<>
				<View className='flex-1 justify-center items-center bg-background px-6'>
					<Ionicons name='cart-outline' size={80} color='#9ca3af' />
					<Typography variant='h1' className='mt-6 mb-2 text-center'>
						Your cart is empty
					</Typography>
					<Typography variant='body' className='text-muted-foreground text-center'>
						Add some products to get started
					</Typography>
				</View>
				
				{/* Success Modal - render even when cart is empty */}
				<SuccessModal visible={isSuccessModalVisible} onClose={handleSuccessClose} />
			</>
		)
	}

	return (
		<View className='flex-1 bg-background'>
			<ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
				{/* Cart Items List */}
				<View className='px-4 mt-4'>
					{items.map(item => (
						<View
							key={item.product.id}
							className='bg-card rounded-xl p-4 mb-4 border border-border flex-row'
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
											onPress={() => updateQuantity(item.product.id, item.quantity - 1)}
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
											onPress={() => updateQuantity(item.product.id, item.quantity + 1)}
											className='w-10 h-10 items-center justify-center'
											activeOpacity={0.7}
										>
											<Ionicons name='add' size={20} color='#1f2937' />
										</TouchableOpacity>
									</View>

									{/* Remove Button */}
									<TouchableOpacity
										onPress={() => removeItem(item.product.id)}
										className='p-2'
										activeOpacity={0.7}
									>
										<Ionicons name='trash-outline' size={20} color='#ef4444' />
									</TouchableOpacity>
								</View>
							</View>
						</View>
					))}
				</View>

				{/* Total Price Section */}
				<View className='px-4 mt-4 mb-4'>
					<View className='bg-card rounded-xl p-4 border border-border'>
						<View className='flex-row justify-between items-center mb-2'>
							<Typography variant='body' className='text-muted-foreground'>
								Subtotal
							</Typography>
							<Typography variant='body' className='font-semibold text-foreground'>
								${totalPrice.toFixed(2)}
							</Typography>
						</View>
						<View className='h-px bg-border my-2' />
						<View className='flex-row justify-between items-center'>
							<Typography variant='h2' className='font-bold text-xl'>
								Total
							</Typography>
							<Typography variant='h1' className='text-primary text-2xl font-bold'>
								${totalPrice.toFixed(2)}
							</Typography>
						</View>
					</View>
				</View>

				{/* Checkout Button */}
				<View className='px-4 mb-6'>
					<Button
						title='Checkout'
						variant='primary'
						onPress={handleCheckout}
						className='w-full'
					/>
				</View>
			</ScrollView>

			{/* Checkout Modal */}
			<CheckoutModal
				visible={isCheckoutModalVisible}
				onClose={() => setIsCheckoutModalVisible(false)}
				onSubmit={handleCheckoutSubmit}
				isLoading={isSubmitting}
			/>

			{/* Success Modal */}
			<SuccessModal visible={isSuccessModalVisible} onClose={handleSuccessClose} />
		</View>
	)
}
