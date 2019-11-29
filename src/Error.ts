interface HttpError {
	httpCode: number
	toJSON: () => { message: string }
}

export class UserNotFoundError implements HttpError {
	httpCode = 404
	toJSON = () => ({ message: 'not found.' })
}

export class InvalidParamsError implements HttpError {
	httpCode = 403
	toJSON = () => ({ message: 'invalid params.' })
}
