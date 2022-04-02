import { AbstractEventConsumer, Topics, TweetUpdatedEvent } from '@o.yilmaz/shared'

export class TweetUpdatedEventConsumer extends AbstractEventConsumer<TweetUpdatedEvent> {
    readonly topic: TweetUpdatedEvent['topic'] = Topics.TweetUpdated

    protected getGroupId() {
        return 'TweetUpdatedEventConsumer'
    }

    onMessage(data: TweetUpdatedEvent['data']) {
        console.log('[TweetUpdatedEventConsumer] Message received ', data.toString())
    }
}

export const tweetUpdatedEventConsumer = new TweetUpdatedEventConsumer()