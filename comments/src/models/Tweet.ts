import { Schema, Model, Document, model } from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'

interface TweetAttributes {
    id: string
    userId: string
    content: string
}

export interface TweetDocument extends Document {
    id: string
    userId: string
    content: string
    version: number
}

interface TweetModel extends Model<TweetDocument> {
    build(attrs: TweetAttributes): TweetDocument

    findByVersion(event: { id: string; version: number }): Promise<TweetDocument | null>
}

const tweetSchema = new Schema(
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

tweetSchema.statics.build = (attrs: TweetAttributes) => {

    return new Tweet({
        _id: attrs.id,
        userId: attrs.userId,
        content: attrs.content,
    })
}

tweetSchema.statics.findByVersion = (event: { id: string; version: number }) => {

    return Tweet.findOne({
        _id: event.id,
        version: event.version - 1
    })
}

const Tweet = model<TweetDocument, TweetModel>('Tweet', tweetSchema);

export { Tweet };