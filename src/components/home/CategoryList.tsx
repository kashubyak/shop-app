import { Typography } from '@/components/ui/Typography'
import { FlatList, TouchableOpacity, View } from 'react-native'

interface CategoryListProps {
	categories: string[]
	activeCategory: string
	onSelectCategory: (category: string) => void
}

export const CategoryList = ({
	categories,
	activeCategory,
	onSelectCategory,
}: CategoryListProps) => {
	const data = ['all', ...categories]

	return (
		<View className='py-4'>
			<FlatList
				data={data}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
				keyExtractor={item => item}
				renderItem={({ item }) => {
					const isActive = activeCategory === item
					return (
						<TouchableOpacity
							onPress={() => onSelectCategory(item)}
							className={`px-4 py-2 rounded-full border ${
								isActive ? 'bg-primary border-primary' : 'bg-card border-border'
							}`}
						>
							<Typography
								className={`capitalize ${
									isActive ? 'text-primary-foreground font-bold' : 'text-foreground'
								}`}
							>
								{item}
							</Typography>
						</TouchableOpacity>
					)
				}}
			/>
		</View>
	)
}
