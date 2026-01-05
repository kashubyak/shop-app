import { CheckoutForm, CheckoutFormData } from './CheckoutForm'
import { Ionicons } from '@expo/vector-icons'
import { Modal, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

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
	const insets = useSafeAreaInsets()

	return (
		<Modal
			visible={visible}
			animationType='slide'
			presentationStyle='pageSheet'
			onRequestClose={onClose}
		>
			<View className='flex-1 bg-background' style={{ paddingTop: insets.top }}>
				{/* Header with close button */}
				<View className='flex-row items-center justify-between px-4 py-3 border-b border-border'>
					<TouchableOpacity
						onPress={onClose}
						className='w-10 h-10 items-center justify-center'
						activeOpacity={0.7}
						disabled={isLoading}
					>
						<Ionicons name='close' size={24} color='#1f2937' />
					</TouchableOpacity>
				</View>

				{/* Form Content */}
				<CheckoutForm onSubmit={onSubmit} onCancel={onClose} isLoading={isLoading} />
			</View>
		</Modal>
	)
}

