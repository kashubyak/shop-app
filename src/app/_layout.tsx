import { useAuthStore } from '@/store/useAuthStore'
import { AppDarkTheme, AppLightTheme } from '@/theme'
import { ThemeProvider } from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import '../../global.css'

const queryClient = new QueryClient()

export default function RootLayout() {
	const colorScheme = useColorScheme()
	const theme = colorScheme === 'dark' ? AppDarkTheme : AppLightTheme
	const checkAuth = useAuthStore(state => state.checkAuth)

	useEffect(() => {
		checkAuth()
	}, [])

	return (
		<SafeAreaProvider>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider value={theme}>
					<Stack>
						<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
					</Stack>
					<StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
				</ThemeProvider>
			</QueryClientProvider>
		</SafeAreaProvider>
	)
}
