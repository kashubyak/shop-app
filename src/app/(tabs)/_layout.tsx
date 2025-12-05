import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { useColorScheme } from 'react-native'
import { AppDarkTheme, AppLightTheme } from '../../theme'

export default function TabLayout() {
	const colorScheme = useColorScheme()
	const theme = colorScheme === 'dark' ? AppDarkTheme : AppLightTheme

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: theme.colors.primary,
				tabBarInactiveTintColor: 'gray',
				headerTitleAlign: 'center',
				headerStyle: {
					backgroundColor: theme.colors.card,
					shadowColor: 'transparent',
					elevation: 0,
					borderBottomWidth: 1,
					borderBottomColor: theme.colors.border,
				},
				headerTitleStyle: {
					color: theme.colors.text,
					fontWeight: '600',
				},
				tabBarStyle: {
					backgroundColor: theme.colors.card,
					borderTopColor: theme.colors.border,
				},
				tabBarLabelStyle: {
					fontSize: 12,
					fontWeight: '600',
				},
			}}
		>
			<Tabs.Screen
				name='index'
				options={{
					title: 'Products',
					tabBarIcon: ({ focused, color, size }) => (
						<Ionicons
							name={focused ? 'home' : 'home-outline'}
							size={size}
							color={color}
						/>
					),
				}}
			/>

			<Tabs.Screen
				name='cart'
				options={{
					title: 'Cart',
					tabBarIcon: ({ focused, color, size }) => (
						<Ionicons
							name={focused ? 'cart' : 'cart-outline'}
							size={size}
							color={color}
						/>
					),
				}}
			/>

			<Tabs.Screen
				name='profile'
				options={{
					title: 'Profile',
					tabBarIcon: ({ focused, color, size }) => (
						<Ionicons
							name={focused ? 'person' : 'person-outline'}
							size={size}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	)
}
