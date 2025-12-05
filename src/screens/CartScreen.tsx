import { View } from 'react-native'
import { Typography } from '../components/ui/Typography'
import { RootTabScreenProps } from '../types/navigation'

type Props = RootTabScreenProps<'Cart'>

export const CartScreen = ({ route }: Props) => {
	return (
		<View className='flex-1 justify-center items-center bg-background'>
			<Typography variant='h1' className='text-green-600'>
				Cart
			</Typography>
			<Typography variant='body' className='mt-2'>
				Selected items: 0
			</Typography>
		</View>
	)
}
