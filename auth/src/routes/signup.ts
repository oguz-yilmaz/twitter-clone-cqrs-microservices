import express, { Request, Response } from 'express'
import jsonwebtoken from 'jsonwebtoken'
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

        const jwt = jsonwebtoken.sign({
            id: user.id,
            username: user.username,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname
        }, process.env.JWT_KEY!)

        await new UserCreatedEventProducer().send(Topics.UsersCreated, {
            id: user.id,
            username: user.username,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            version: 1
        })

        return res.status(201).send({ jwt })
    }
)

export { router as signupRouter }