import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Typography } from '@/components/ui/Typography'
import { Controller, useForm } from 'react-hook-form'
import { View, TouchableOpacity, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useLocation } from '@/hooks/useLocation'
import { useEffect } from 'react'

export interface CheckoutFormData {
	name: string
	phone: string
	address: string
	location?: {
		latitude: number
		longitude: number
		address?: string
		accuracy?: number
		timestamp?: number
	}
}

interface CheckoutFormProps {
	onSubmit: (data: CheckoutFormData) => void
	onCancel: () => void
	isLoading?: boolean
}

export const CheckoutForm = ({ onSubmit, onCancel, isLoading = false }: CheckoutFormProps) => {
	const { location, isLoading: isLocationLoading, getCurrentLocation } = useLocation()
	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = useForm<CheckoutFormData>({
		defaultValues: {
			name: '',
			phone: '',
			address: '',
			location: undefined,
		},
	})

	const currentLocation = watch('location')

	useEffect(() => {
		if (location) {
			setValue('location', location)
			if (location.address) {
				setValue('address', location.address)
			}
		}
	}, [location, setValue])

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
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			className='flex-1 bg-background'
		>
			<ScrollView
				className='flex-1'
				contentContainerStyle={{ padding: 24, paddingBottom: 40 }}
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps='handled'
			>
				<Typography variant='body' className='text-muted-foreground mb-6 text-center'>
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

				{/* Location Button */}
				<View className='mb-6'>
					<Typography className='text-sm font-semibold text-foreground mb-2'>
						Delivery Location
					</Typography>
					<TouchableOpacity
						onPress={getCurrentLocation}
						disabled={isLocationLoading}
						className='flex-row items-center justify-between bg-muted rounded-xl p-4 border border-border'
						activeOpacity={0.7}
					>
						<View className='flex-row items-center flex-1'>
							{isLocationLoading ? (
								<ActivityIndicator size='small' color='#2563EB' />
							) : (
								<Ionicons name='location' size={20} color='#2563EB' />
							)}
							<View className='ml-3 flex-1'>
								<Typography className='text-foreground font-medium'>
									{isLocationLoading
										? 'Getting location...'
										: currentLocation
											? 'Location detected'
											: 'Get my location'}
								</Typography>
								{currentLocation && (
									<Typography className='text-muted-foreground text-xs mt-1' numberOfLines={1}>
										{currentLocation.address ||
											`${currentLocation.latitude.toFixed(6)}, ${currentLocation.longitude.toFixed(6)}`}
									</Typography>
								)}
							</View>
						</View>
						{currentLocation && (
							<Ionicons name='checkmark-circle' size={24} color='#10b981' />
						)}
					</TouchableOpacity>
				</View>

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

				{/* Location Display */}
				{currentLocation && (
					<View className='mb-6 p-4 bg-muted/50 rounded-xl border border-border'>
						<View className='flex-row items-center mb-2'>
							<Ionicons name='location' size={16} color='#10b981' />
							<Typography className='text-sm font-semibold text-foreground ml-2'>
								Location Details
							</Typography>
						</View>
						{currentLocation.address && (
							<Typography className='text-xs text-foreground mb-2 font-medium'>
								{currentLocation.address}
							</Typography>
						)}
						<Typography className='text-xs text-muted-foreground mb-1'>
							Latitude: {currentLocation.latitude.toFixed(6)}
						</Typography>
						<Typography className='text-xs text-muted-foreground mb-1'>
							Longitude: {currentLocation.longitude.toFixed(6)}
						</Typography>
						{currentLocation.accuracy && (
							<Typography className='text-xs text-muted-foreground'>
								Accuracy: ±{currentLocation.accuracy.toFixed(0)}m
							</Typography>
						)}
					</View>
				)}

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
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

