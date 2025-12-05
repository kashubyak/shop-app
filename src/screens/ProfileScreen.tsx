import React from 'react'
import { Text, View } from 'react-native'
import { RootTabScreenProps } from '../types/navigation'

type Props = RootTabScreenProps<'Profile'>

export const ProfileScreen = ({ route }: Props) => {
	return (
		<View className='flex-1 justify-center items-center bg-white'>
			<Text className='text-2xl font-bold text-purple-600'>My Profile</Text>
			<Text className='text-gray-500 mt-2'>User is not authenticated</Text>
		</View>
	)
}
