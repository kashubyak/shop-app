import { useState } from 'react'
import { View, ScrollView, Image, TouchableOpacity, Alert, ActivityIndicator, Modal, KeyboardAvoidingView, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Typography } from '@/components/ui/Typography'
import { useImagePicker } from '@/hooks/useImagePicker'
import { useMyProductsStore } from '@/store/useMyProductsStore'
import { useCategories } from '@/hooks/useProducts'

interface CreateProductFormProps {
	onSuccess?: () => void
}

export const CreateProductForm = ({ onSuccess }: CreateProductFormProps) => {
	const [title, setTitle] = useState('')
	const [price, setPrice] = useState('')
	const [description, setDescription] = useState('')
	const [category, setCategory] = useState('')
	const [rating, setRating] = useState('5.0')
	const [isSubmitting, setIsSubmitting] = useState(false)

	const { imageUri, showImagePickerOptions, clearImage, isLoading: isImageLoading } = useImagePicker()
	const { addProduct } = useMyProductsStore()
	const { data: categories = [] } = useCategories()
	const [showCategoryModal, setShowCategoryModal] = useState(false)

	const handleSubmit = async () => {
		if (!title.trim()) {
			Alert.alert('Error', 'Please enter a product title')
			return
		}

		if (!price.trim() || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
			Alert.alert('Error', 'Please enter a valid price')
			return
		}

		if (!category) {
			Alert.alert('Error', 'Please select a category')
			return
		}

		if (!imageUri) {
			Alert.alert('Error', 'Please add a product image')
			return
		}

		setIsSubmitting(true)
		try {
			await addProduct({
				title: title.trim(),
				price: parseFloat(price),
				description: description.trim() || 'No description',
				category,
				image: imageUri,
				rating: {
					rate: parseFloat(rating) || 5.0,
					count: 0,
				},
			})

			Alert.alert('Success', 'Product created successfully!')
			
			// Clear form
			setTitle('')
			setPrice('')
			setDescription('')
			setCategory('')
			setRating('5.0')
			clearImage()

			onSuccess?.()
		} catch (error) {
			Alert.alert('Error', 'Failed to create product')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			className='flex-1 bg-background'
		>
			<ScrollView
				className='flex-1 bg-background'
				contentContainerStyle={{ padding: 24 }}
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps='handled'
			>
				<Typography variant='h1' className='mb-2 text-center'>
					Create Product
				</Typography>

				<Typography variant='body' className='mb-8 text-center text-muted-foreground'>
					Add a new product to your collection
				</Typography>

				{/* Image Picker */}
				<View className='mb-6'>
					{imageUri ? (
						<View className='relative'>
							<Image
								source={{ uri: imageUri }}
								className='w-full h-64 rounded-xl'
								resizeMode='cover'
							/>
							<TouchableOpacity
								onPress={clearImage}
								className='absolute top-2 right-2 bg-red-500 rounded-full p-2'
								activeOpacity={0.7}
							>
								<Ionicons name='close' size={20} color='white' />
							</TouchableOpacity>
						</View>
					) : (
						<TouchableOpacity
							onPress={showImagePickerOptions}
							disabled={isImageLoading}
							className='w-full h-64 border-2 border-dashed border-border rounded-xl items-center justify-center bg-muted/50'
							activeOpacity={0.7}
						>
							{isImageLoading ? (
								<ActivityIndicator size='large' color='gray' />
							) : (
								<>
									<Ionicons name='camera-outline' size={48} color='#9ca3af' />
									<Typography variant='body' className='text-muted-foreground mt-2'>
										Tap to add photo
									</Typography>
								</>
							)}
						</TouchableOpacity>
					)}
				</View>

				<Input
					label='Product Title'
					value={title}
					onChangeText={setTitle}
					placeholder='Enter product title'
				/>

				<Input
					label='Price'
					value={price}
					onChangeText={setPrice}
					placeholder='0.00'
					keyboardType='numeric'
				/>

				{/* Category Selector */}
				<View className='mb-6'>
					<Typography className='text-sm font-semibold text-foreground mb-2'>
						Category
					</Typography>
					<TouchableOpacity
						onPress={() => setShowCategoryModal(true)}
						className='border-b border-border pb-3 flex-row items-center justify-between'
						activeOpacity={0.7}
					>
						<Typography className='text-foreground'>
							{category 
								? category.charAt(0).toUpperCase() + category.slice(1)
								: 'Select category'
							}
						</Typography>
						<Ionicons name='chevron-down' size={20} color='gray' />
					</TouchableOpacity>
				</View>

				{/* Category Modal */}
				<Modal
					visible={showCategoryModal}
					transparent
					animationType='slide'
					onRequestClose={() => setShowCategoryModal(false)}
				>
					<View className='flex-1 justify-end bg-black/50'>
						<View className='bg-card rounded-t-3xl p-6 max-h-[80%]'>
							<View className='flex-row justify-between items-center mb-4'>
								<Typography variant='h2'>Select Category</Typography>
								<TouchableOpacity onPress={() => setShowCategoryModal(false)} activeOpacity={0.7}>
									<Ionicons name='close' size={24} color='gray' />
								</TouchableOpacity>
							</View>
							<ScrollView>
								{categories.map((cat: string) => (
									<TouchableOpacity
										key={cat}
										onPress={() => {
											setCategory(cat)
											setShowCategoryModal(false)
										}}
										className={`py-4 px-4 rounded-xl mb-2 ${
											category === cat ? 'bg-primary' : 'bg-muted'
										}`}
										activeOpacity={0.7}
									>
										<Typography
											className={
												category === cat
													? 'text-primary-foreground font-semibold'
													: 'text-foreground'
											}
										>
											{cat.charAt(0).toUpperCase() + cat.slice(1)}
										</Typography>
									</TouchableOpacity>
								))}
							</ScrollView>
						</View>
					</View>
				</Modal>

				<Input
					label='Description'
					value={description}
					onChangeText={setDescription}
					placeholder='Enter product description'
					multiline
					numberOfLines={4}
				/>

				<Input
					label='Rating'
					value={rating}
					onChangeText={setRating}
					placeholder='5.0'
					keyboardType='numeric'
				/>

				<Button
					title='Create Product'
					onPress={handleSubmit}
					isLoading={isSubmitting}
					className='w-full mt-4'
				/>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

