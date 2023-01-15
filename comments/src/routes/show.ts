import express, { Request, Response } from 'express'
import { Tweet } from '@models/Tweet'
import { AuthenticateUser } from '@o.yilmaz/shared'

const router = express.Router()

router.get(
    '/api/tweets/rd/:id',
    AuthenticateUser,
    async (req: Request, res: Response) => {
        const tweets = await Tweet.find({
            _id: req.params.id,
            userId: req.currentUser!.id,
        })

        res.send(tweets)
    }
);

export { router as ShowTweetsRouter }