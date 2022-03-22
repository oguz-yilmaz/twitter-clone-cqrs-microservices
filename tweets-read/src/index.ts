import mongoose from 'mongoose'
import { app } from "./app"
import { TweetCreatedEventConsumer } from '@events/consumers/TweetCreatedEventConsumer'

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY env variable needs to be defined.')
    }

    try {
        await new TweetCreatedEventConsumer().listen()

        await mongoose.connect(process.env.MONGO_URI!)

        app.listen(3014, () => {
            console.log('Tweets read service => listening on port 3014')
        })
    }
    catch (e) {
        console.log(e)
        console.log('Failed to connect database!!!')
    }
}

start()