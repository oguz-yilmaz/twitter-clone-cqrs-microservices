import mongoose from "mongoose"
import {Password} from "../services/Password"

interface UserAttrs {
    email: string
    password: string
    username: string
    firstname: string
    lastname: string
}

interface UserDocument extends mongoose.Document {
    email: string
    password: string
    username: string
    firstname: string
    lastname: string
}

interface UserModel extends mongoose.Model<UserDocument> {
    build(attrs: UserAttrs): UserDocument
}

const userSchema = new mongoose.Schema({
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        }
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id
                delete ret._id

                // remove password from User document
                delete ret.password
                delete ret.__v
            }
        }
    })

userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashedPassword = await Password.toHash(this.get('password'))

        this.set('password', hashedPassword)
    }

    done()
})

// Enables us to use User.build({..})
userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs)
}

const User = mongoose.model<UserDocument, UserModel>('User', userSchema)

export { User }
