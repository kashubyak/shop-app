import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'

interface AuthState {
	token: string | null
	user: any | null
	isLoading: boolean
	login: (token: string) => Promise<void>
	logout: () => Promise<void>
	checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>(set => ({
	token: null,
	user: null,
	isLoading: true,

	login: async (token: string) => {
		await AsyncStorage.setItem('user_token', token)
		set({ token, isLoading: false })
	},

	logout: async () => {
		await AsyncStorage.removeItem('user_token')
		set({ token: null, user: null, isLoading: false })
	},

	checkAuth: async () => {
		try {
			const token = await AsyncStorage.getItem('user_token')
			if (token) {
				set({ token })
			}
		} catch (e) {
			console.error('Failed to load token')
		} finally {
			set({ isLoading: false })
		}
	},
}))
