import { AbstractEventConsumer, Topics, TweetUpdatedEvent } from '@o.yilmaz/shared'
import { Tweet } from '@models/Tweet'

export class TweetUpdatedEventConsumer extends AbstractEventConsumer<TweetUpdatedEvent> {
    readonly topic: TweetUpdatedEvent['topic'] = Topics.TweetUpdated

    protected getGroupId() {
        return 'TweetUpdatedEventConsumer'
    }

    async onMessage(data: TweetUpdatedEvent['data']) {
        const { id, userId, content, version } = data

        const tweet = await Tweet.findOne({
            _id: id,
            userId,
            version: version - 1
        })

        if (!tweet) {
            throw new Error('Tweet not found')
        }

        console.log('[TweetUpdatedEventConsumer] Message received ', data.toString())

        tweet.set({ content }).save()

        await tweet.save()
    }
}

export const tweetUpdatedEventConsumer = new TweetUpdatedEventConsumer()