import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native'

export const AppLightTheme: Theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: '#2563EB',
		background: '#FFFFFF',
		card: '#FFFFFF',
		text: '#171717',
		border: '#E5E7EB',
		notification: '#EF4444',
	},
}

export const AppDarkTheme: Theme = {
	...DarkTheme,
	colors: {
		...DarkTheme.colors,
		primary: '#3B82F6',
		background: '#0A0A0A',
		card: '#171717',
		text: '#FAFAFA',
		border: '#262626',
		notification: '#7F1D1D',
	},
}
