import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from "cookie-session"
import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'

import { ErrorHandler, NotFoundError } from "@o.yilmaz/shared"

const app = express()
// trust ingress proxy
app.set('trust proxy', true)
app.use(json())
app.use(cookieSession({
    name: "ticket.local session",
    signed: false,
    // secure: process.env.NODE_ENV !== 'test'
    secure: false,
    maxAge: 10 * 60 * 1000, // 10mins
}))

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.all('*', () => {
    throw new NotFoundError()
})

app.use(ErrorHandler)

export { app }