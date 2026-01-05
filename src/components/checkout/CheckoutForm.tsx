import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Typography } from '@/components/ui/Typography'
import { Controller, useForm } from 'react-hook-form'
import { View } from 'react-native'

export interface CheckoutFormData {
	name: string
	phone: string
	address: string
}

interface CheckoutFormProps {
	onSubmit: (data: CheckoutFormData) => void
	onCancel: () => void
	isLoading?: boolean
}

export const CheckoutForm = ({ onSubmit, onCancel, isLoading = false }: CheckoutFormProps) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<CheckoutFormData>({
		defaultValues: {
			name: '',
			phone: '',
			address: '',
		},
	})

	/**
	 * Validates phone number format
	 * Phone must contain only digits and be at least 10 digits long
	 */
	const validatePhone = (phone: string): boolean | string => {
		const phoneRegex = /^\d{10,}$/
		if (!phoneRegex.test(phone)) {
			return 'Phone must contain only digits and be at least 10 digits long'
		}
		return true
	}

	return (
		<View className='flex-1 bg-background'>
			<View className='px-6 pt-4 pb-4'>
				<Typography variant='body' className='text-muted-foreground mb-6'>
					Please fill in your details to complete the order
				</Typography>

				{/* Name Field */}
				<Controller
					control={control}
					name='name'
					rules={{
						required: 'Name is required',
						minLength: {
							value: 2,
							message: 'Name must be at least 2 characters',
						},
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
							label='Full Name'
							placeholder='Enter your full name'
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
							error={errors.name?.message}
							autoCapitalize='words'
						/>
					)}
				/>

				{/* Phone Field */}
				<Controller
					control={control}
					name='phone'
					rules={{
						required: 'Phone is required',
						validate: validatePhone,
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
							label='Phone Number'
							placeholder='Enter your phone number'
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
							error={errors.phone?.message}
							keyboardType='phone-pad'
						/>
					)}
				/>

				{/* Address Field */}
				<Controller
					control={control}
					name='address'
					rules={{
						required: 'Address is required',
						minLength: {
							value: 5,
							message: 'Address must be at least 5 characters',
						},
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
							label='Delivery Address'
							placeholder='Enter your delivery address'
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
							error={errors.address?.message}
							multiline
							numberOfLines={3}
							textAlignVertical='top'
						/>
					)}
				/>

				{/* Action Buttons */}
				<View className='mt-4 gap-3'>
					<Button
						title='Place Order'
						variant='primary'
						onPress={handleSubmit(onSubmit)}
						isLoading={isLoading}
						className='w-full'
					/>
					<Button
						title='Cancel'
						variant='outline'
						onPress={onCancel}
						disabled={isLoading}
						className='w-full'
					/>
				</View>
			</View>
		</View>
	)
}

