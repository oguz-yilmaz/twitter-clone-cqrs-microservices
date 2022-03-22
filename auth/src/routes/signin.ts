import express, { Request, Response } from 'express'
import {ValidateRequest, BadRequestError} from '@o.yilmaz/shared'
import {User} from "../models/User"
import {Password} from "../services/Password"
import jwt from "jsonwebtoken"
import { SigninValidation } from './validations/SigninValidation'

const router = express.Router()

router.post(
    '/api/users/signin',
    SigninValidation,
    ValidateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body

        const existingUser = await User.findOne({ email })

        if (!existingUser) {
            throw new BadRequestError('Invalid credentials.')
        }

        const passwordMatch = await Password.compare(existingUser.password, password)

        if (!passwordMatch) {
            throw new BadRequestError('Invalid credentials.')
        }

        const userJwt = jwt.sign({
            id: existingUser.id,
            email: existingUser.email
        }, process.env.JWT_KEY!)

        req.session = {
            jwt: userJwt
        }

        return res.status(200).send({existingUser, userJwt})
    }
)

export { router as signinRouter }