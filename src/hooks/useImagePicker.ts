import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { Alert, Platform } from 'react-native'

export const useImagePicker = () => {
	const [imageUri, setImageUri] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	const requestPermissions = async () => {
		if (Platform.OS !== 'web') {
			const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync()
			const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync()

			if (cameraStatus !== 'granted' || mediaLibraryStatus !== 'granted') {
				Alert.alert(
					'Permissions Required',
					'Camera and photo library permissions are required to upload photos.'
				)
				return false
			}
		}
		return true
	}

	const pickImageFromGallery = async () => {
		const hasPermission = await requestPermissions()
		if (!hasPermission) return

		setIsLoading(true)
		try {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 0.8,
			})

			if (!result.canceled && result.assets[0]) {
				setImageUri(result.assets[0].uri)
				return result.assets[0].uri
			}
		} catch (error) {
			console.error('Error picking image from gallery:', error)
			Alert.alert('Error', 'Failed to load image from gallery')
		} finally {
			setIsLoading(false)
		}
		return null
	}

	const takePhotoFromCamera = async () => {
		const hasPermission = await requestPermissions()
		if (!hasPermission) return

		setIsLoading(true)
		try {
			const result = await ImagePicker.launchCameraAsync({
				allowsEditing: true,
				aspect: [4, 3],
				quality: 0.8,
			})

			if (!result.canceled && result.assets[0]) {
				setImageUri(result.assets[0].uri)
				return result.assets[0].uri
			}
		} catch (error) {
			console.error('Error taking photo:', error)
			Alert.alert('Error', 'Failed to take photo')
		} finally {
			setIsLoading(false)
		}
		return null
	}

	const showImagePickerOptions = () => {
		Alert.alert(
			'Select Photo Source',
			'Where would you like to get the photo from?',
			[
				{
					text: 'Gallery',
					onPress: pickImageFromGallery,
				},
				{
					text: 'Camera',
					onPress: takePhotoFromCamera,
				},
				{
					text: 'Cancel',
					style: 'cancel',
				},
			]
		)
	}

	const clearImage = () => {
		setImageUri(null)
	}

	return {
		imageUri,
		isLoading,
		pickImageFromGallery,
		takePhotoFromCamera,
		showImagePickerOptions,
		clearImage,
	}
}

