import { Typography } from '@/components/ui/Typography'
import { Ionicons } from '@expo/vector-icons'
import { Modal, TouchableOpacity, View } from 'react-native'

interface SuccessModalProps {
	visible: boolean
	onClose: () => void
}

export const SuccessModal = ({ visible, onClose }: SuccessModalProps) => {
	return (
		<Modal
			visible={visible}
			transparent
			animationType='fade'
			onRequestClose={onClose}
		>
			<View className='flex-1 bg-black/50 justify-center items-center px-6'>
				<View className='bg-card rounded-2xl p-6 w-full max-w-sm border border-border'>
					{/* Success Icon */}
					<View className='items-center mb-4'>
						<View className='w-20 h-20 bg-green-100 rounded-full items-center justify-center mb-4'>
							<Ionicons name='checkmark-circle' size={60} color='#10b981' />
						</View>
					</View>

					{/* Success Message */}
					<Typography variant='h1' className='text-2xl font-bold text-center mb-2'>
						Order Successful!
					</Typography>
					<Typography variant='body' className='text-muted-foreground text-center mb-6'>
						Your order has been placed successfully. We will contact you soon.
					</Typography>

					{/* Close Button */}
					<TouchableOpacity
						onPress={onClose}
						className='bg-primary rounded-xl py-4 items-center'
						activeOpacity={0.8}
					>
						<Typography variant='body' className='text-primary-foreground font-bold'>
							Continue Shopping
						</Typography>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	)
}

