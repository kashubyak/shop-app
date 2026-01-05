import { TextInput, TextInputProps, View, useColorScheme } from 'react-native'
import { Typography } from './Typography'

interface InputProps extends TextInputProps {
	label?: string
	error?: string
}

export const Input = ({ label, error, className = '', ...props }: InputProps) => {
	const colorScheme = useColorScheme()
	const placeholderColor = colorScheme === 'dark' ? '#6b7280' : '#9ca3af'

	return (
		<View className='mb-5 w-full'>
			{label && (
				<View className='mb-2.5'>
					<Typography className='text-sm font-semibold text-foreground'>
						{label}
					</Typography>
				</View>
			)}

			<TextInput
				className={`w-full text-base text-foreground ${className}`}
				placeholderTextColor={placeholderColor}
				{...props}
			/>

			{error && (
				<View className='mt-1.5'>
					<Typography variant='error'>
						{error}
					</Typography>
				</View>
			)}
		</View>
	)
}
