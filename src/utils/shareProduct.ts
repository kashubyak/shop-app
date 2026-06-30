import * as Linking from 'expo-linking'
import { Share, Platform } from 'react-native'
import Constants from 'expo-constants'

/**
 * Generates a deep link URL for a product
 * @param productId - The ID of the product to share
 * @returns The deep link URL (e.g., shop-app://product/123)
 */
export const generateProductLink = (productId: number): string => {
	// Use the scheme from app.json, fallback to 'shop-app' if not available
	const scheme = Constants.expoConfig?.scheme || 'shop-app'
	return `${scheme}://product/${productId}`
}

/**
 * Shares a product using the native share sheet
 * @param productId - The ID of the product to share
 * @param productTitle - The title of the product (optional, for better share message)
 */
export const shareProduct = async (productId: number, productTitle?: string): Promise<void> => {
	const link = generateProductLink(productId)

	try {
		const shareOptions: { message: string; url?: string; title?: string } = {
			message: link,
		}

		// On iOS, include url separately for better handling
		if (Platform.OS === 'ios') {
			shareOptions.url = link
		}

		await Share.share(shareOptions)
	} catch (error) {
		// Share failed or was cancelled - silently fail
	}
}

