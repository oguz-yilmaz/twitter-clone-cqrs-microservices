import { AbstractEventProducer, TweetUpdatedEvent } from '@o.yilmaz/shared'

class TweetUpdatedEventProducer extends AbstractEventProducer<TweetUpdatedEvent> {}

export const tweetUpdatedEventProducer = new TweetUpdatedEventProducer()