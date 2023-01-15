import { AbstractEventConsumer, Topics, TweetCreatedEvent } from '@o.yilmaz/shared'
import { Tweet } from '@models/Tweet'

class TweetCreatedEventConsumer extends AbstractEventConsumer<TweetCreatedEvent> {
    readonly topic: TweetCreatedEvent['topic'] = Topics.TweetCreated

    protected getGroupId() {
        return 'TweetCreatedEventConsumer'
    }

    async onMessage(data: TweetCreatedEvent['data']) {
        const { id, userId, content } = data

        console.log('[TweetCreatedEventConsumer] Message received ', data)

        try {
            const existingTweet = await Tweet.findById(id);

            if (existingTweet) {
                return true
            }

            const tweet = Tweet.build({ id, userId, content })

            await tweet.save()
        }
        catch (e) {
            console.error('[TweetCreatedEventConsumer FAILED] ', e)

            throw new Error('Retry the message.')
        }
    }
}

export const tweetCreatedEventConsumer = new TweetCreatedEventConsumer()