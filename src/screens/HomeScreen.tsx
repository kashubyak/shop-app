import React from 'react'
import { Text, View } from 'react-native'
import { RootTabScreenProps } from '../types/navigation'

type Props = RootTabScreenProps<'Home'>

export const HomeScreen = ({ navigation, route }: Props) => {
	return (
		<View className='flex-1 justify-center items-center bg-white'>
			<Text className='text-2xl font-bold text-blue-500'>Screen: {route.name}</Text>
			<Text className='text-gray-500 mt-2'>Here will be the list of products</Text>
		</View>
	)
}
