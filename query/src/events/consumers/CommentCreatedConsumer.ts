import { AbstractEventConsumer, CommentCreatedEvent, Topics } from '@o.yilmaz/shared'

export class CommentCreatedConsumer extends AbstractEventConsumer<CommentCreatedEvent> {
    readonly topic: CommentCreatedEvent["topic"] = Topics.Comments

    protected getGroupId(): string {
        return Topics.Comments
    }

    onMessage(data: CommentCreatedEvent["data"]): void {
        // save comments data to our query database, check versions to prevent out of order messages
        console.log('Comment created event received ', data)
    }
}