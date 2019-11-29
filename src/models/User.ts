import { Status } from './Status'

export interface User {
	id: number
	name: string
	status: Status
}

let userlistAutoId = 0
export const userlist: User[] = [
	{
		name: 'tanaka',
		status: Status.Active,
	},
	{
		name: 'suzuki',
		status: Status.Stoped,
	},
].map(r => ({ id: ++userlistAutoId, ...r }))

export const create = (user: Omit<User, 'id'>): User => {
	const { name, status } = user
	const id = ++userlistAutoId
	return { id, name, status }
}
