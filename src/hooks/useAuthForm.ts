import { loginUser, registerUser } from '@/service/auth'
import { useAuthStore } from '@/store/useAuthStore'
import { useState } from 'react'
import { Alert } from 'react-native'

export const useAuthForm = () => {
	const [isLoginMode, setIsLoginMode] = useState(true)
	const [loading, setLoading] = useState(false)

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')

	const { login } = useAuthStore()

	const toggleMode = () => setIsLoginMode(prev => !prev)

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
					email,
					username,
					password,
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

	return {
		isLoginMode,
		loading,
		values: { username, password, email, firstName, lastName },
		setters: { setUsername, setPassword, setEmail, setFirstName, setLastName },
		toggleMode,
		handleSubmit,
	}
}
