import { AbstractEventConsumer, Topics, TweetCreatedEvent } from '@o.yilmaz/shared'

export class TweetCreatedEventConsumer extends AbstractEventConsumer<TweetCreatedEvent> {
    readonly topic: TweetCreatedEvent['topic'] = Topics.Tweets

    protected getGroupId() {
        return 'TweetCreatedEventConsumer'
    }

    onMessage(data: TweetCreatedEvent['data']) {
        console.log('Message received ', data.toString())
    }
}