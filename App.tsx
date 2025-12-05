import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { CartScreen } from './src/screens/CartScreen'
import { HomeScreen } from './src/screens/HomeScreen'
import { ProfileScreen } from './src/screens/ProfileScreen'
import { RootTabParamList } from './src/types/navigation'

const Tab = createBottomTabNavigator<RootTabParamList>()

export default function App() {
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={{
					tabBarActiveTintColor: '#007AFF',
					tabBarInactiveTintColor: 'gray',
					headerTitleAlign: 'center',
					tabBarLabelStyle: {
						fontSize: 12,
						fontWeight: '600',
					},
				}}
			>
				<Tab.Screen name='Home' component={HomeScreen} options={{ title: 'Products' }} />
				<Tab.Screen name='Cart' component={CartScreen} options={{ title: 'Cart' }} />
				<Tab.Screen
					name='Profile'
					component={ProfileScreen}
					options={{ title: 'Profile' }}
				/>
			</Tab.Navigator>
			<StatusBar style='auto' />
		</NavigationContainer>
	)
}
