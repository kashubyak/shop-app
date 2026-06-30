import { View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface RatingProps {
	rating: number
	maxRating?: number
	size?: number
	color?: string
	showCount?: boolean
	count?: number
}

export const Rating = ({
	rating,
	maxRating = 5,
	size = 20,
	color = '#FBBF24',
	showCount = false,
	count,
}: RatingProps) => {
	const fullStars = Math.floor(rating)
	const hasHalfStar = rating % 1 >= 0.5
	const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0)

	return (
		<View className='flex-row items-center gap-1'>
			{Array.from({ length: fullStars }).map((_, index) => (
				<Ionicons key={`full-${index}`} name='star' size={size} color={color} />
			))}
			{hasHalfStar && <Ionicons name='star-half' size={size} color={color} />}
			{Array.from({ length: emptyStars }).map((_, index) => (
				<Ionicons key={`empty-${index}`} name='star-outline' size={size} color={color} />
			))}
			{showCount && count !== undefined && (
				<View className='ml-2'>
					<Ionicons name='people-outline' size={size - 4} color='gray' />
				</View>
			)}
		</View>
	)
}

