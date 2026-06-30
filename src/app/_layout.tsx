import { useAuthStore } from '@/store/useAuthStore'
import { useCartStore } from '@/store/useCartStore'
import { AppDarkTheme, AppLightTheme } from '@/theme'
import { ThemeProvider } from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { LogBox, useColorScheme } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import * as Linking from 'expo-linking'
import '../../global.css'

// Hide SafeAreaView warning since we're using react-native-safe-area-context
LogBox.ignoreLogs(['SafeAreaView has been deprecated'])

const queryClient = new QueryClient()

export default function RootLayout() {
	const colorScheme = useColorScheme()
	const theme = colorScheme === 'dark' ? AppDarkTheme : AppLightTheme
	const checkAuth = useAuthStore(state => state.checkAuth)
	const loadCart = useCartStore(state => state.loadCart)
	const router = useRouter()

	useEffect(() => {
		checkAuth()
		loadCart()
	}, [])

	// Handle deep links
	useEffect(() => {
		const handleDeepLink = (event: { url: string }) => {
			const parsed = Linking.parse(event.url)
			const path = parsed.path || parsed.hostname
			
			if (path) {
				const pathParts = path.split('/').filter(Boolean)
				
				if (pathParts[0] === 'product' && pathParts[1]) {
					const productId = pathParts[1]
					router.push(`/product/${productId}`)
				}
			}
		}

		// Handle initial URL if app was opened via deep link
		Linking.getInitialURL().then((url) => {
			if (url) {
				handleDeepLink({ url })
			}
		})

		// Listen for deep links while app is running
		const subscription = Linking.addEventListener('url', handleDeepLink)

		return () => {
			subscription.remove()
		}
	}, [router])

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
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
		</GestureHandlerRootView>
	)
}
