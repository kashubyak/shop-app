import axios from 'axios'

const API_URL = 'https://fakestoreapi.com'

export const getProducts = async () => {
	const { data } = await axios.get(`${API_URL}/products`)
	return data
}

export const getCategories = async () => {
	const { data } = await axios.get(`${API_URL}/products/categories`)
	return data
}

export const getProductsByCategory = async (category: string) => {
	const { data } = await axios.get(`${API_URL}/products/category/${category}`)
	return data
}
