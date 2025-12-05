import { Input } from '@/components/ui/Input'
import { View } from 'react-native'

interface RegisterFieldsProps {
	firstName: string
	lastName: string
	email: string
	setFirstName: (text: string) => void
	setLastName: (text: string) => void
	setEmail: (text: string) => void
}

export const RegisterFields = ({
	firstName,
	lastName,
	email,
	setFirstName,
	setLastName,
	setEmail,
}: RegisterFieldsProps) => {
	return (
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
	)
}
