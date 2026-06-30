import { View } from 'react-native'
import { Typography } from '../components/ui/Typography'
import { RootTabScreenProps } from '../types/navigation'

type Props = RootTabScreenProps<'Home'>

export const HomeScreen = ({ route }: Props) => {
	return (
		<View className='flex-1 justify-center items-center bg-background'>
			<Typography variant='h1' className='text-blue-500'>
				Screen: {route.name}
			</Typography>
			<Typography variant='body' className='mt-2'>
				Here will be the list of products
			</Typography>
		</View>
	)
}
