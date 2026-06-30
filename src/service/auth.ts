import axios from 'axios'
import { IUserData } from '../types/user.interface'

const API_URL = 'https://fakestoreapi.com'

export const loginUser = async (username: string, password: string) => {
	const { data } = await axios.post(`${API_URL}/auth/login`, {
		username,
		password,
	})
	return data
}

export const registerUser = async (userData: IUserData) => {
	const { data } = await axios.post(`${API_URL}/users`, userData)
	return data
}

export const getUserProfile = async (id: number = 1) => {
	const { data } = await axios.get(`${API_URL}/users/${id}`)
	return data
}
