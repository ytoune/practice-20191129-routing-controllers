import {
	IsInterface,
	isString,
	isSingletonStringUnion,
	TypeGuard,
	isOptional,
	isFiniteNumber,
} from 'generic-type-guard'
import { Status } from '../models/Status'
import { User } from '../models/User'
import { InvalidParamsError } from '../Error'

type NewUser = Omit<User, 'id'>
const isNewUser: TypeGuard<NewUser> = new IsInterface()
	.withProperty('name', isString)
	.withProperty(
		'status',
		isSingletonStringUnion(...(Object.keys(Status) as Status[])),
	)
	.get()
export const assertAsNewUser: (
	user: unknown,
) => asserts user is NewUser = user => {
	if (!isNewUser(user)) throw new InvalidParamsError()
}

type UpdateUser = Partial<User>
const isUpdateUser: TypeGuard<UpdateUser> = new IsInterface()
	.withProperty('id', isOptional(isFiniteNumber))
	.withProperty('name', isOptional(isString))
	.withProperty(
		'status',
		isOptional(isSingletonStringUnion(...(Object.keys(Status) as Status[]))),
	)
	.get()
export const assertAsUpdateUser: (
	user: unknown,
	id?: User['id'],
) => asserts user is UpdateUser = (user, id) => {
	if (!isUpdateUser(user)) throw new InvalidParamsError()
	if (undefined !== user.id && undefined !== id && id !== user.id)
		throw new InvalidParamsError()
	if (undefined === user.name && undefined === user.status)
		throw new InvalidParamsError()
}
