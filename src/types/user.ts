export interface IUser {
	id: number
	email: string
	username: string
	password: string
	name: {
		firstName: string
		lastName: string
	}
	address: {
		city: string
		street: string
		number: number
		zipcode: string
		lat: string
		long: string
	}
	phone: string
}

export interface IUserData extends Omit<IUser, 'id'> {}