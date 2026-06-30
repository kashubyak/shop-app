import { ActivityIndicator, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Typography } from './Typography'

interface ButtonProps extends TouchableOpacityProps {
	title: string
	variant?: 'primary' | 'secondary' | 'outline'
	isLoading?: boolean
}

export const Button = ({
	title,
	variant = 'primary',
	isLoading = false,
	className = '',
	disabled,
	...props
}: ButtonProps) => {
	const getContainerStyle = () => {
		const base = 'h-12 rounded-xl flex-row justify-center items-center px-6'
		switch (variant) {
			case 'primary':
				return `${base} bg-primary active:opacity-90`
			case 'secondary':
				return `${base} bg-muted active:opacity-80`
			case 'outline':
				return `${base} bg-transparent border border-border active:bg-muted`
		}
	}

	const getTextStyle = () => {
		switch (variant) {
			case 'primary':
				return 'text-primary-foreground font-bold text-base'
			case 'secondary':
				return 'text-foreground font-semibold text-base'
			case 'outline':
				return 'text-foreground font-medium text-base'
		}
	}

	return (
		<TouchableOpacity
			className={`${getContainerStyle()} ${
				disabled || isLoading ? 'opacity-50' : ''
			} ${className}`}
			disabled={disabled || isLoading}
			activeOpacity={0.7}
			{...props}
		>
			{isLoading ? (
				<ActivityIndicator color={variant === 'primary' ? 'white' : 'gray'} />
			) : (
				<Typography className={getTextStyle()}>{title}</Typography>
			)}
		</TouchableOpacity>
	)
}
