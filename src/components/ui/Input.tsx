import { TextInput, TextInputProps, View } from 'react-native'
import { Typography } from './Typography'

interface InputProps extends TextInputProps {
	label?: string
	error?: string
}

export const Input = ({ label, error, className = '', ...props }: InputProps) => {
	return (
		<View className='mb-4 w-full'>
			{label && (
				<Typography variant='caption' className='mb-2 font-medium text-foreground'>
					{label}
				</Typography>
			)}

			<TextInput
				className={`w-full bg-muted border border-border rounded-xl px-4 py-3.5 text-base text-foreground placeholder:text-muted-foreground ${
					error ? 'border-destructive' : 'focus:border-primary focus:border-2'
				} ${className}`}
				placeholderTextColor='gray'
				{...props}
			/>

			{error && (
				<Typography variant='error' className='mt-1'>
					{error}
				</Typography>
			)}
		</View>
	)
}
