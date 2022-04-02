import express, { Request, Response } from 'express'
import { tweetCreatedProducer } from '@events/producers/TweetCreatedEventProducer'
import { Tweet } from '@models/Tweet'
import { Topics, AuthenticateUser } from '@o.yilmaz/shared'
import { CreateValidation } from './validations/CreateValidation'

const router = express.Router()

router.post(
    '/api/tweets/wr',
    CreateValidation,
    AuthenticateUser,
    async (req: Request, res: Response) => {
        const { content } = req.body

        const tweet = Tweet.build({
            content,
            userId: req.currentUser!.id
        })

        await tweet.save()

        await tweetCreatedProducer.send(Topics.TweetCreated, {
            id: tweet.id,
            content: tweet.content,
            userId: tweet.userId,
            version: tweet.version,
        })

        res.status(201).send(tweet)
    }
)

export { router as CreateTweetRouter }