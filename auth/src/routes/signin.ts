import express, { Request, Response } from 'express'
import {ValidateRequest, BadRequestError} from '@o.yilmaz/shared'
import {User} from "../models/User"
import {Password} from "../services/Password"
import jsonwebtoken from "jsonwebtoken"
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

        const jwt = jsonwebtoken.sign({
            id: existingUser.id,
            username: existingUser.username,
            email: existingUser.email,
            firstname: existingUser.firstname,
            lastname: existingUser.lastname,
        }, process.env.JWT_KEY!)

        return res.status(200).send({ jwt })
    }
)

export { router as signinRouter }