import { Typography } from '@/components/ui/Typography'
import { View } from 'react-native'

export default function HomeScreen() {
	return (
		<View className='flex-1 justify-center items-center bg-background'>
			<Typography variant='h1' className='text-blue-500'>
				Screen: Home
			</Typography>
			<Typography variant='body' className='mt-2'>
				Here will be the list of products
			</Typography>
		</View>
	)
}
