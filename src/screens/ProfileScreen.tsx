import { useState } from 'react'
import { View } from 'react-native'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Typography } from '../components/ui/Typography'
import { RootTabScreenProps } from '../types/navigation'

type Props = RootTabScreenProps<'Profile'>

export const ProfileScreen = ({ route }: Props) => {
	const [loading, setLoading] = useState(false)

	const handlePress = () => {
		setLoading(true)
		setTimeout(() => setLoading(false), 2000)
	}

	return (
		<View className='flex-1 justify-center items-center bg-background px-6'>
			<Typography variant='h1' className='mb-2'>
				Login
			</Typography>
			<Typography variant='body' className='mb-8 text-center'>
				Welcome back to the Shop App. Please enter your details.
			</Typography>
			<Input
				label='Email'
				placeholder='user@example.com'
				keyboardType='email-address'
				autoCapitalize='none'
			/>
			<Input label='Password' placeholder='******' secureTextEntry />
			<Button
				title='Sign In'
				onPress={handlePress}
				isLoading={loading}
				className='w-full mt-4'
			/>
			<Button
				title='Create Account'
				variant='outline'
				className='w-full mt-3'
				onPress={() => console.log('Register')}
			/>
		</View>
	)
}
