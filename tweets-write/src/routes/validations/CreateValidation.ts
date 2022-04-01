import { body } from 'express-validator'

const contentValidation = body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required.')

const userIdValidation = body('userId')
    .notEmpty()
    .withMessage('User id is required.')

export const CreateValidation = [
    contentValidation,
    userIdValidation
]