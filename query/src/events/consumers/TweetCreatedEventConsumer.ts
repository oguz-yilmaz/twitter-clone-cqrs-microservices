import { AbstractEventConsumer, Topics, TweetCreatedEvent } from '@o.yilmaz/shared'

class TweetCreatedEventConsumer extends AbstractEventConsumer<TweetCreatedEvent> {
    readonly topic: TweetCreatedEvent['topic'] = Topics.TweetCreated

    protected getGroupId() {
        return 'TweetCreatedEventConsumer'
    }

    onMessage(data: TweetCreatedEvent['data']) {
        console.log('[TweetCreatedEventConsumer] Message received ', data.toString())
    }
}

export const tweetCreatedEventConsumer = new TweetCreatedEventConsumer()