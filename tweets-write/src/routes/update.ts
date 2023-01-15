import express, { Request, Response } from 'express'
import { Tweet } from '@models/Tweet'
import {
    NotAuthorizedError,
    NotFoundError,
    Topics,
    AuthenticateUser
} from '@o.yilmaz/shared'
import { tweetUpdatedEventProducer } from '@events/producers/TweetUpdatedEventProducer'
import { UpdateValidation } from './validations/UpdateValidation'

const router = express.Router()

router.put(
    '/api/tweets/wr/:id',
    UpdateValidation,
    AuthenticateUser,
    async (req: Request, res: Response) => {
        const { content } = req.body

        const tweet = await Tweet.findById(req.params.id)

        if (!tweet) {
            throw new NotFoundError()
        }

        if (tweet.userId !== req.currentUser!.id) {
            throw new NotAuthorizedError()
        }

        await tweet.set({ content }).save()

        await tweetUpdatedEventProducer.send(Topics.TweetUpdated, {
            id: tweet.id,
            content: tweet.content,
            userId: req.currentUser!.id,
            version: tweet.version,
        })

        res.status(201).send(tweet)
    }
)

export { router as UpdateTweetRouter }