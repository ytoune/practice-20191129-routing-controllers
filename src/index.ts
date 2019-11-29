import 'reflect-metadata'

import { useExpressServer } from 'routing-controllers'
import express from 'express'
import { Users } from './controllers/Users'

const main = async () => {
	const app = express()
	app.use(express.json())
	useExpressServer(app, { controllers: [Users] })
	app.listen(3434, () => console.log('start'))
}

main().catch(x => {
	console.log('# something happens.')
	console.error(x)
	if ('undefined' === typeof process) return
	process.exit(1)
})
