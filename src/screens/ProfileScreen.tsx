import { useState } from 'react'
import { Alert, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Typography } from '../components/ui/Typography'
import { loginUser, registerUser } from '../service/auth'
import { useAuthStore } from '../store/useAuthStore'
import { RootTabScreenProps } from '../types/navigation'

type Props = RootTabScreenProps<'Profile'>

export const ProfileScreen = ({ route }: Props) => {
	const [isLoginMode, setIsLoginMode] = useState(true)
	const [loading, setLoading] = useState(false)

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')

	const { token, login, logout } = useAuthStore()

	const handleSubmit = async () => {
		if (!username || !password) {
			Alert.alert('Error', 'Username and password are required')
			return
		}

		if (!isLoginMode && (!email || !firstName || !lastName)) {
			Alert.alert('Error', 'Please fill in all fields')
			return
		}

		setLoading(true)
		try {
			if (isLoginMode) {
				const data = await loginUser(username, password)
				await login(data.token)
				Alert.alert('Success', 'You are successfully logged in!')
			} else {
				await registerUser({
					email: email,
					username: username,
					password: password,
					name: { firstName: firstName, lastName: lastName },
					address: {
						city: 'Kyiv',
						street: 'Khreschatyk',
						number: 1,
						zipcode: '01001',
						lat: '',
						long: '',
					},
					phone: '123-456-7890',
				})

				Alert.alert('Success', 'Account created! Please log in.')
				setIsLoginMode(true)
			}
		} catch (error: any) {
			Alert.alert('Error', error.response?.data || 'Something went wrong')
		} finally {
			setLoading(false)
		}
	}

	if (token) {
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
					onPress={logout}
					className='w-full border-red-500'
				/>
			</View>
		)
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			className='flex-1 bg-background'
		>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}
				keyboardShouldPersistTaps='handled'
			>
				<Typography variant='h1' className='mb-2 text-center'>
					{isLoginMode ? 'Login' : 'Create Account'}
				</Typography>

				<Typography variant='body' className='mb-8 text-center'>
					{isLoginMode
						? 'Welcome back to the Shop App.'
						: 'Fill in the details to join us!'}
				</Typography>

				{!isLoginMode && (
					<>
						<View className='flex-row gap-2'>
							<View className='flex-1'>
								<Input
									label='First Name'
									placeholder='John'
									value={firstName}
									onChangeText={setFirstName}
								/>
							</View>
							<View className='flex-1'>
								<Input
									label='Last Name'
									placeholder='Doe'
									value={lastName}
									onChangeText={setLastName}
								/>
							</View>
						</View>

						<Input
							label='Email'
							placeholder='john@example.com'
							keyboardType='email-address'
							autoCapitalize='none'
							value={email}
							onChangeText={setEmail}
						/>
					</>
				)}

				<Input
					label='Username'
					placeholder='mor_2314'
					autoCapitalize='none'
					value={username}
					onChangeText={setUsername}
				/>

				<Input
					label='Password'
					placeholder='83r5^_'
					secureTextEntry
					value={password}
					onChangeText={setPassword}
				/>

				<Button
					title={isLoginMode ? 'Sign In' : 'Sign Up'}
					onPress={handleSubmit}
					isLoading={loading}
					className='w-full mt-4'
				/>

				<Button
					title={isLoginMode ? 'Create Account' : 'Back to Login'}
					variant='outline'
					className='w-full mt-3'
					onPress={() => setIsLoginMode(!isLoginMode)}
				/>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}
