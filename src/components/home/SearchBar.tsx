import { Ionicons } from '@expo/vector-icons'
import { useEffect, useRef, useState } from 'react'
import { TextInput, TouchableOpacity, View, useColorScheme } from 'react-native'

interface SearchBarProps {
	value: string
	onChangeText: (text: string) => void
	placeholder?: string
	onClear?: () => void
}

export const SearchBar = ({
	value,
	onChangeText,
	placeholder = 'Search products...',
	onClear,
}: SearchBarProps) => {
	const colorScheme = useColorScheme()
	const inputRef = useRef<TextInput>(null)
	const placeholderColor = colorScheme === 'dark' ? '#6b7280' : '#9ca3af'

	return (
		<View className='px-4 py-3 bg-background'>
			<View
				className='flex-row items-center rounded-xl border px-4'
				style={{
					backgroundColor: colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#f9fafb',
					borderColor: colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#e5e7eb',
				}}
			>
				<Ionicons name='search' size={20} color={placeholderColor} style={{ marginRight: 8 }} />
				<TextInput
					ref={inputRef}
					value={value}
					onChangeText={onChangeText}
					placeholder={placeholder}
					placeholderTextColor={placeholderColor}
					className='flex-1 py-3 text-base text-foreground'
					style={{
						includeFontPadding: false,
					}}
					autoCapitalize='none'
					autoCorrect={false}
					returnKeyType='search'
				/>
				{value.length > 0 && (
					<TouchableOpacity
						onPress={() => {
							onChangeText('')
							onClear?.()
						}}
						className='ml-2 p-1'
						hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
					>
						<Ionicons name='close-circle' size={20} color={placeholderColor} />
					</TouchableOpacity>
				)}
			</View>
		</View>
	)
}

