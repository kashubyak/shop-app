import { useAuthStore } from '@/store/useAuthStore'
import { useCartStore } from '@/store/useCartStore'
import { AppDarkTheme, AppLightTheme } from '@/theme'
import { ThemeProvider } from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { LogBox, useColorScheme } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import '../../global.css'

// Hide SafeAreaView warning since we're using react-native-safe-area-context
LogBox.ignoreLogs(['SafeAreaView has been deprecated'])

const queryClient = new QueryClient()

export default function RootLayout() {
	const colorScheme = useColorScheme()
	const theme = colorScheme === 'dark' ? AppDarkTheme : AppLightTheme
	const checkAuth = useAuthStore(state => state.checkAuth)
	const loadCart = useCartStore(state => state.loadCart)

	useEffect(() => {
		checkAuth()
		loadCart()
	}, [])

	return (
		<SafeAreaProvider>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider value={theme}>
					<Stack>
						<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
						<Stack.Screen 
							name='product/[id]' 
							options={{ 
								headerShown: false,
								presentation: 'card',
								animation: 'slide_from_right',
							}} 
						/>
					</Stack>
					<StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
				</ThemeProvider>
			</QueryClientProvider>
		</SafeAreaProvider>
	)
}
