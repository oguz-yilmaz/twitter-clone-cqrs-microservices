import { AbstractEventProducer, TweetCreatedEvent } from '@o.yilmaz/shared'

class TweetCreatedEventProducer extends AbstractEventProducer<TweetCreatedEvent> {}

export const tweetCreatedProducer = new TweetCreatedEventProducer()