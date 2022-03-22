import express from 'express'
import {CurrentUser} from '@o.yilmaz/shared'

const router = express.Router()

router.get('/api/users/current-user', CurrentUser,(req, res) => {
    return res.send({ currentUser: req.currentUser || null })
})

export { router as currentUserRouter }