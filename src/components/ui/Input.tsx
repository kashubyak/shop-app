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
		<View className='mb-6 w-full'>
			{label && (
				<View className='mb-2'>
					<Typography className='text-sm font-semibold text-foreground'>
						{label}
					</Typography>
				</View>
			)}

			<TextInput
				className={`w-full text-base text-foreground ${className}`}
				style={{
					paddingTop: 12,
					paddingBottom: 12,
					paddingLeft: 0,
					paddingRight: 0,
					marginTop: 0,
					marginBottom: 0,
					borderBottomWidth: 1,
					borderBottomColor: error 
						? 'rgba(239, 68, 68, 0.5)' 
						: colorScheme === 'dark' 
							? 'rgba(255, 255, 255, 0.1)' 
							: 'rgba(0, 0, 0, 0.1)',
					textAlignVertical: props.multiline ? 'top' : 'center',
					includeFontPadding: false,
				}}
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
