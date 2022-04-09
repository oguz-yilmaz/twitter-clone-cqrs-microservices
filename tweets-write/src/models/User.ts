import { Schema, Model, Document, model } from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'

interface UserAttributes {
    id?: string
    username: string
    email: string
    firstname: string
    lastname: string
}

export interface UserDocument extends Document {
    id: string
    username: string
    email: string
    firstname: string
    lastname: string
}

interface UserModel extends Model<UserDocument> {
    build(attrs: UserAttributes): UserDocument

    findByVersion(event: { id: string; version: number }): Promise<UserDocument | null>
}

const userSchema = new Schema(
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

const User = model<UserDocument, UserModel>('User', userSchema);

export { User };