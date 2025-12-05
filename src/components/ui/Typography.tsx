import React from 'react'
import { Text, TextProps } from 'react-native'

type Variant = 'h1' | 'h2' | 'body' | 'caption' | 'error'

interface TypographyProps extends TextProps {
	variant?: Variant
	className?: string
	children: React.ReactNode
}

export const Typography = ({
	variant = 'body',
	className = '',
	children,
	...props
}: TypographyProps) => {
	const getStyle = () => {
		switch (variant) {
			case 'h1':
				return 'text-3xl font-bold text-foreground'
			case 'h2':
				return 'text-xl font-semibold text-foreground'
			case 'body':
				return 'text-base text-muted-foreground'
			case 'caption':
				return 'text-xs text-muted-foreground'
			case 'error':
				return 'text-sm text-destructive font-medium'
			default:
				return 'text-base text-foreground'
		}
	}

	return (
		<Text className={`${getStyle()} ${className}`} {...props}>
			{children}
		</Text>
	)
}
