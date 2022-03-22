import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import { CurrentUser, ErrorHandler, NotFoundError } from '@o.yilmaz/shared'
import { CreateTweetRouter } from './routes/create'
import { UpdateTweetRouter } from './routes/update'

process.env.JWT_KEY = 'test'

const app = express()
// trust ingress proxy
app.set('trust proxy', true)

app.use(json())

app.use(CurrentUser)

app.use(CreateTweetRouter)
app.use(UpdateTweetRouter)

app.all('*', () => {
    throw new NotFoundError()
})

app.use(ErrorHandler)

export { app }