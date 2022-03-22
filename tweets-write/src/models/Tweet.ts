import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'

interface TweetAttributes {
    userId: string
    content: string
}

export interface TweetDocument extends mongoose.Document {
    userId: string
    content: string
    version: number
}

interface TweetModel extends mongoose.Model<TweetDocument> {
    build(attrs: TweetAttributes): TweetDocument

    findByEvent(event: { id: string; version: number }): Promise<TweetDocument | null>
}

const tweetSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id

                delete ret._id
            },
        },
    }
);

tweetSchema.set('versionKey', 'version')
tweetSchema.plugin(updateIfCurrentPlugin)

// adds method to ticket model
tweetSchema.statics.build = (attrs: TweetAttributes) => {
    return new Tweet({
        userId: attrs.userId,
        content: attrs.content,
    })
}

tweetSchema.statics.findByEvent = (event: { id: string; version: number }) => {
    return Tweet.findOne({
        _id: event.id,
        version: event.version - 1
    })
}

const Tweet = mongoose.model<TweetDocument, TweetModel>('Tweet', tweetSchema);

export { Tweet };