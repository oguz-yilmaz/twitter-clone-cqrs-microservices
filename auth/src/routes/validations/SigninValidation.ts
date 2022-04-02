import { body } from 'express-validator'

const emailValidation = body('email')
    .isEmail()
    .withMessage('Email must be valid')

const passwordValidation = body('email')
    .trim()
    .notEmpty()
    .withMessage('Password is required')

export const SigninValidation = [
    emailValidation,
    passwordValidation
]