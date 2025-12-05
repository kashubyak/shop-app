import React from 'react'
import { Text, View } from 'react-native'
import { RootTabScreenProps } from '../types/navigation'

type Props = RootTabScreenProps<'Cart'>

export const CartScreen = ({ route }: Props) => {
	return (
		<View className='flex-1 justify-center items-center bg-white'>
			<Text className='text-2xl font-bold text-green-600'>Cart</Text>
			<Text className='text-gray-500 mt-2'>Selected items: 0</Text>
		</View>
	)
}
