import express, { Request, Response } from 'express'
import { tweetCreatedProducer } from '@events/producers/TweetCreatedEventProducer'
import { Tweet } from '@models/Tweet'
import { Topics, AuthenticateUser } from '@o.yilmaz/shared'

const router = express.Router()

router.post(
    '/api/tweets/wr',
    AuthenticateUser,
    async (req: Request, res: Response) => {
        const { content, userId } = req.body

        const tweet = Tweet.build({ content, userId })

        await tweet.save()

        await tweetCreatedProducer.send(Topics.Tweets, {
            id: tweet.id,
            content: tweet.content,
            userId: tweet.userId,
            version: tweet.version,
        })

        res.status(201).send(tweet)
    }
)

export { router as CreateTweetRouter }