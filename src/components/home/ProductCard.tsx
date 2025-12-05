import { IProduct } from '@/types/products.interface'
import { Image, Text, TouchableOpacity, View } from 'react-native'

interface ProductCardProps {
	product: IProduct
	onPress?: (id: number) => void
}

export const ProductCard = ({ product, onPress }: ProductCardProps) => {
	return (
		<TouchableOpacity
			className='bg-card rounded-xl shadow-sm border border-border p-3 mb-4 w-[48%]'
			onPress={() => onPress?.(product.id)}
			activeOpacity={0.7}
		>
			<View className='bg-white rounded-lg items-center justify-center h-32 mb-2 p-2'>
				<Image
					source={{ uri: product.image }}
					className='w-full h-full'
					resizeMode='contain'
				/>
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
