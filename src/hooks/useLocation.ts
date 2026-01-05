import { useState, useEffect } from 'react'
import * as Location from 'expo-location'
import { Alert, Platform } from 'react-native'

export interface LocationData {
	latitude: number
	longitude: number
	address?: string
	accuracy?: number
	timestamp?: number
}

export const useLocation = () => {
	const [location, setLocation] = useState<LocationData | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const requestPermissions = async (): Promise<boolean> => {
		try {
			const { status } = await Location.requestForegroundPermissionsAsync()
			if (status !== 'granted') {
				Alert.alert(
					'Permission Required',
					'Location permission is required to get your delivery address.'
				)
				return false
			}
			return true
		} catch (err) {
			return false
		}
	}

	const getCurrentLocation = async () => {
		setIsLoading(true)
		setError(null)

		try {
			// Check if permissions are already granted
			const { status: existingStatus } = await Location.getForegroundPermissionsAsync()
			
			if (existingStatus !== 'granted') {
				const hasPermission = await requestPermissions()
				if (!hasPermission) {
					setError('Location permission denied')
					setIsLoading(false)
					return null
				}
			}

			// Check if location services are enabled
			const isEnabled = await Location.hasServicesEnabledAsync()
			if (!isEnabled) {
				Alert.alert(
					'Location Services Disabled',
					'Please enable location services in your device settings.'
				)
				setError('Location services are disabled')
				setIsLoading(false)
				return null
			}

			// Get current location with high accuracy
			const currentLocation = await Location.getCurrentPositionAsync({
				accuracy: Location.Accuracy.High,
			})

			const { latitude, longitude, accuracy } = currentLocation.coords

			// Reverse geocoding to get address
			let address: string | undefined
			try {
				const reverseGeocode = await Location.reverseGeocodeAsync({
					latitude,
					longitude,
				})

				if (reverseGeocode.length > 0) {
					const addr = reverseGeocode[0]
					address = [
						addr.street,
						addr.streetNumber,
						addr.city,
						addr.postalCode,
						addr.country,
					]
						.filter(Boolean)
						.join(', ')
				}
			} catch (geocodeError) {
				// Continue without address if reverse geocoding fails
			}

			const locationData: LocationData = {
				latitude,
				longitude,
				address,
				accuracy: accuracy ?? undefined,
				timestamp: Date.now(),
			}

			setLocation(locationData)
			setIsLoading(false)
			return locationData
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Failed to get location'
			setError(errorMessage)
			setIsLoading(false)
			Alert.alert('Error', errorMessage)
			return null
		}
	}

	return {
		location,
		isLoading,
		error,
		getCurrentLocation,
	}
}

