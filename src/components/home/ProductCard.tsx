import { IProduct } from '@/types/products.interface'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface ProductCardProps {
	product: IProduct
	onPress?: (id: number) => void
	onDelete?: (id: number) => void
}

export const ProductCard = ({ product, onPress, onDelete }: ProductCardProps) => {
	return (
		<TouchableOpacity
			className='bg-card rounded-xl shadow-sm border border-border p-2 mb-4 w-[48%]'
			onPress={() => onPress?.(product.id)}
			activeOpacity={0.7}
		>
			<View className='bg-gray-100 rounded-lg items-center justify-center h-32 mb-2 overflow-hidden relative'>
				<Image
					source={{ uri: product.image }}
					className='w-full h-full'
					resizeMode='contain'
				/>
				{onDelete && (
					<TouchableOpacity
						onPress={(e) => {
							e.stopPropagation()
							onDelete(product.id)
						}}
						className='absolute top-2 right-2 bg-red-500 rounded-full p-2 z-10'
						activeOpacity={0.7}
					>
						<Ionicons name='trash-outline' size={16} color='white' />
					</TouchableOpacity>
				)}
			</View>

			<View>
				<Text numberOfLines={1} className='text-sm font-medium text-foreground mb-1'>
					{product.title}
				</Text>

				<Text className='text-xs text-muted-foreground mb-1 capitalize'>
					{product.category}
				</Text>

				<Text className='text-lg font-bold text-primary'>${product.price}</Text>
			</View>
		</TouchableOpacity>
	)
}
