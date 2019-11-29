import { Status } from './Status'

export interface User {
	id: number
	name: string
	status: Status
}

const { Active, Stoped } = Status

let userlistAutoId = 0

export const create = (user: Omit<User, 'id'>): User => {
	const { name, status } = user
	const id = ++userlistAutoId
	return { id, name, status }
}

export const userlist: User[] = [
	{
		name: 'tanaka',
		status: Active,
	},
	{
		name: 'suzuki',
		status: Stoped,
	},
].map(create)
