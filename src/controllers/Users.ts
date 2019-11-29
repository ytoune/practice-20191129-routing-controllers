import { JsonController } from 'routing-controllers'
import { Get, Post, Delete, Put } from 'routing-controllers'
import { OnUndefined } from 'routing-controllers'
import { Body, Param } from 'routing-controllers'
import { UserNotFoundError } from '../Error'
import { userlist, create as createUser, User } from '../models/User'
import { assertAsNewUser, assertAsUpdateUser } from './asserts'

@JsonController('/users')
export class Users {
	@Get('/')
	async list(): Promise<User[]> {
		return userlist
	}

	@Get('/:id')
	@OnUndefined(UserNotFoundError)
	async get(@Param('id') id: number): Promise<User | undefined> {
		return userlist.find(u => id === u.id)
	}

	@Post('/')
	async create(@Body() user: unknown): Promise<number> {
		assertAsNewUser(user)
		userlist.push(createUser(user))
		return userlist.length
	}

	@Delete('/:id')
	@OnUndefined(UserNotFoundError)
	async remove(@Param('id') id: number): Promise<User | undefined> {
		const idx = userlist.map(u => u.id).indexOf(id)
		if (idx < 0) return
		return userlist.splice(idx, 1)[0]
	}

	@Put('/:id')
	@OnUndefined(UserNotFoundError)
	async put(
		@Param('id') id: number,
		@Body() user: unknown,
	): Promise<User | undefined> {
		assertAsUpdateUser(user, id)
		const idx = userlist.map(u => u.id).indexOf(id)
		if (idx < 0) return
		const { name, status } = { ...userlist[idx], ...user }
		return (userlist[idx] = { id, name, status })
	}
}
