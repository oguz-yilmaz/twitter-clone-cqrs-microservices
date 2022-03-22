import express, { Request, Response } from 'express'
import { Tweet } from '@models/Tweet'
import { NotAuthorizedError, NotFoundError, Topics } from '@o.yilmaz/shared'
import { TweetUpdatedEventProducer } from '@events/producers/TweetUpdatedEventProducer'

const router = express.Router()

router.put('/api/tweets/wr', async (req: Request, res: Response) => {
    const tweet = await Tweet.findById(req.params.id)

    if (!tweet) {
        throw new NotFoundError()
    }

    if (tweet.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError()
    }

    await tweet.set({ content: req.body.title }).save()

    await new TweetUpdatedEventProducer().send(Topics.Tweets, {
        id: tweet.id,
        content: tweet.content,
        userId: tweet.userId,
        version: tweet.version,
    })

    res.status(201).send(tweet)
});

export { router as UpdateTweetRouter }