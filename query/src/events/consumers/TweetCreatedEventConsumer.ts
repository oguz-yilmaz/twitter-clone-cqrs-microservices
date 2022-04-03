import { AbstractEventConsumer, Topics, TweetCreatedEvent } from '@o.yilmaz/shared'
import { Tweet } from '@models/Tweet'

class TweetCreatedEventConsumer extends AbstractEventConsumer<TweetCreatedEvent> {
    readonly topic: TweetCreatedEvent['topic'] = Topics.TweetCreated

    protected getGroupId() {
        return 'TweetCreatedEventConsumer'
    }

    async onMessage(data: TweetCreatedEvent['data']) {
        const { id, userId, content } = data

        console.log('[TweetCreatedEventConsumer] Message received ', data.toString())

        const tweet = Tweet.build({ id, userId, content })

        await tweet.save()
    }
}

export const tweetCreatedEventConsumer = new TweetCreatedEventConsumer()