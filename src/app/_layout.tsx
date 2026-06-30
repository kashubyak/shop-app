import { ThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import '../../global.css'
import { useAuthStore } from '../store/useAuthStore'
import { AppDarkTheme, AppLightTheme } from '../theme'

export default function RootLayout() {
	const colorScheme = useColorScheme()
	const theme = colorScheme === 'dark' ? AppDarkTheme : AppLightTheme

	const checkAuth = useAuthStore(state => state.checkAuth)

	useEffect(() => {
		checkAuth()
	}, [])

	return (
		<ThemeProvider value={theme}>
			<Stack>
				<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
			</Stack>
			<StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
		</ThemeProvider>
	)
}
