import { Button } from '@/components/ui/Button'
import { Typography } from '@/components/ui/Typography'
import { View } from 'react-native'

interface LoggedInViewProps {
	onLogout: () => void
}

export const LoggedInView = ({ onLogout }: LoggedInViewProps) => {
	return (
		<View className='flex-1 justify-center items-center bg-background px-6'>
			<Typography variant='h1' className='mb-4 text-green-600'>
				Welcome!
			</Typography>
			<Typography variant='body' className='mb-8 text-center'>
				You are authorized. Token is saved securely.
			</Typography>
			<Button
				title='Logout'
				variant='outline'
				onPress={onLogout}
				className='w-full border-red-500'
			/>
		</View>
	)
}
