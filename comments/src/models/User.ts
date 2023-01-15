import mongoose, { Schema } from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'
import { TweetDocument } from '@models/Tweet'

interface UserAttributes {
    id?: string
    username: string
    email: string
    firstname: string
    lastname: string
    tweets?: TweetDocument[] | null // TweetDocument[] | null | undefined
}

export interface UserDocument extends mongoose.Document {
    id: string
    username: string
    email: string
    firstname: string
    lastname: string
    tweets?: TweetDocument[] | null
}

interface UserModel extends mongoose.Model<UserDocument> {
    build(attrs: UserAttributes): UserDocument

    findByVersion(event: { id: string; version: number }): Promise<UserDocument | null>
}

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        tweets: [{
            type: Schema.Types.ObjectId,
            ref: 'Tweet'
        }]
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

userSchema.set('versionKey', 'version')
userSchema.plugin(updateIfCurrentPlugin)

userSchema.statics.build = (attrs: UserAttributes) => {

    return new User({
        _id: attrs.id,
        username: attrs.username,
        email: attrs.email,
        firstname: attrs.firstname,
        lastname: attrs.lastname,
    })
}

userSchema.statics.findByVersion = (event: { id: string; version: number }) => {

    return User.findOne({
        _id: event.id,
        version: event.version - 1
    })
}

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export { User };