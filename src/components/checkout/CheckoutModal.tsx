import { CheckoutForm, CheckoutFormData } from './CheckoutForm'
import { Ionicons } from '@expo/vector-icons'
import { Modal, TouchableOpacity, View, useColorScheme } from 'react-native'

interface CheckoutModalProps {
	visible: boolean
	onClose: () => void
	onSubmit: (data: CheckoutFormData) => void
	isLoading?: boolean
}

export const CheckoutModal = ({
	visible,
	onClose,
	onSubmit,
	isLoading = false,
}: CheckoutModalProps) => {
	const colorScheme = useColorScheme()
	const iconColor = colorScheme === 'dark' ? '#ffffff' : '#1f2937'

	return (
		<Modal
			visible={visible}
			animationType='slide'
			presentationStyle='pageSheet'
			onRequestClose={onClose}
		>
			<View className='flex-1 bg-background'>
				{/* Drag Handle Indicator */}
				<View className='pt-2 pb-1 items-center'>
					<View className='w-12 h-1 bg-muted-foreground/30 rounded-full' />
				</View>

				{/* Header with close button */}
				<View className='flex-row items-center justify-between px-4 py-3 border-b border-border'>
					<TouchableOpacity
						onPress={onClose}
						className='w-10 h-10 items-center justify-center rounded-full bg-muted active:bg-muted/80'
						activeOpacity={0.7}
						disabled={isLoading}
					>
						<Ionicons name='close' size={22} color={iconColor} />
					</TouchableOpacity>
				</View>

				{/* Form Content */}
				<CheckoutForm onSubmit={onSubmit} onCancel={onClose} isLoading={isLoading} />
			</View>
		</Modal>
	)
}

