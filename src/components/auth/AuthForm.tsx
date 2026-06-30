import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Typography } from '@/components/ui/Typography'
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { RegisterFields } from './RegisterFields'

interface AuthFormProps {
	isLoginMode: boolean
	loading: boolean
	values: {
		username: string
		password: string
		email: string
		firstName: string
		lastName: string
	}
	setters: {
		setUsername: (val: string) => void
		setPassword: (val: string) => void
		setEmail: (val: string) => void
		setFirstName: (val: string) => void
		setLastName: (val: string) => void
	}
	toggleMode: () => void
	handleSubmit: () => void
}

export const AuthForm = ({
	isLoginMode,
	loading,
	values,
	setters,
	toggleMode,
	handleSubmit,
}: AuthFormProps) => {
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
					<RegisterFields
						firstName={values.firstName}
						lastName={values.lastName}
						email={values.email}
						setFirstName={setters.setFirstName}
						setLastName={setters.setLastName}
						setEmail={setters.setEmail}
					/>
				)}

				<Input
					label='Username'
					placeholder='mor_2314'
					autoCapitalize='none'
					value={values.username}
					onChangeText={setters.setUsername}
				/>

				<Input
					label='Password'
					placeholder='83r5^_'
					secureTextEntry
					value={values.password}
					onChangeText={setters.setPassword}
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
					onPress={toggleMode}
				/>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}
