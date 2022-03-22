import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'

interface TweetAttributes {
    id: string
    content: string
}

export interface TweetDocument extends mongoose.Document {
    content: string
    version: number
}

interface TweetModel extends mongoose.Model<TweetDocument> {
    build(attrs: TweetAttributes): TweetDocument

    findByEvent(event: { id: string; version: number }): Promise<TweetDocument | null>
}

const tweetSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0
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
        _id: attrs.id,
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