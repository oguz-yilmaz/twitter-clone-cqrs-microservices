import { body } from 'express-validator'

const emailValidation = body('email')
    .isEmail()
    .withMessage('Email must be valid')

const passwordValidation = body('password')
    .trim()
    .isLength({ min: 4, max: 20})
    .withMessage('Password must be between 4 and 20 chars.')

const usernameValidation = body('username')
    .isAlphanumeric()
    .withMessage('Username must be valid')

const firstnameValidation = body('firstname')
    .isString()
    .withMessage('Firstname must be valid')

const lastnameValidation = body('firstname')
    .isString()
    .withMessage('Lastname must be valid')

export const SignupValidation = [
    emailValidation,
    passwordValidation,
    usernameValidation,
    firstnameValidation,
    lastnameValidation
]