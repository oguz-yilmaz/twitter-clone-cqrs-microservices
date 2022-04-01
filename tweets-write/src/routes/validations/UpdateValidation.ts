import { body } from 'express-validator'

const idValidation = body('id')
    .notEmpty()
    .withMessage('Id is required.')

const contentValidation = body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required.')

const userIdValidation = body('userId')
    .notEmpty()
    .withMessage('User id is required.')

export const UpdateValidation = [
    idValidation,
    contentValidation,
    userIdValidation,
]