import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User } from "../models/User"
import { BadRequestError, Topics, ValidateRequest } from '@o.yilmaz/shared'
import { SignupValidation } from './validations/SignupValidation'
import { UserCreatedEventProducer } from '../events/producers/UserCreatedEventProducer'

const router = express.Router()

router.post(
    '/api/users/signup',
    SignupValidation,
    ValidateRequest,
    async (req: Request, res: Response) => {
        const { email, password, username, firstname, lastname } = req.body

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            throw new BadRequestError('Email in use.')
        }

        const user = User.build({ email, password, username, firstname, lastname })
        await user.save()

        const userJwt = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_KEY!)

        req.session = {
            jwt: userJwt
        }

        await new UserCreatedEventProducer().send(Topics.Users, {
            id: user.id,
            username: user.username,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
        })

        return res.status(201).send(user)
    }
)

export { router as signupRouter }