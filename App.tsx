import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'react-native'
import './global.css'
import { CartScreen } from './src/screens/CartScreen'
import { HomeScreen } from './src/screens/HomeScreen'
import { ProfileScreen } from './src/screens/ProfileScreen'
import { AppDarkTheme, AppLightTheme } from './src/theme'
import { RootTabParamList } from './src/types/navigation'

const Tab = createBottomTabNavigator<RootTabParamList>()

export default function App() {
	const colorScheme = useColorScheme()

	const theme = colorScheme === 'dark' ? AppDarkTheme : AppLightTheme

	return (
		<NavigationContainer theme={theme}>
			<Tab.Navigator
				screenOptions={({ route }) => ({
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
					tabBarIcon: ({ focused, color, size }) => {
						let iconName: keyof typeof Ionicons.glyphMap = 'home'

						if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline'
						else if (route.name === 'Cart') iconName = focused ? 'cart' : 'cart-outline'
						else if (route.name === 'Profile')
							iconName = focused ? 'person' : 'person-outline'

						return <Ionicons name={iconName} size={size} color={color} />
					},
				})}
			>
				<Tab.Screen name='Home' component={HomeScreen} options={{ title: 'Products' }} />
				<Tab.Screen name='Cart' component={CartScreen} options={{ title: 'Cart' }} />
				<Tab.Screen
					name='Profile'
					component={ProfileScreen}
					options={{ title: 'Profile' }}
				/>
			</Tab.Navigator>
			<StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
		</NavigationContainer>
	)
}
