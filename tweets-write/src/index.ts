import mongoose from 'mongoose'
import { app } from "./app"
import dotenv from 'dotenv'
dotenv.config();

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY env variable needs to be defined.')
    }

    try {
        await mongoose.connect(process.env.MONGO_URI!)

        app.listen(3013, () => {
            console.log('Tweets write service => listening on port 3013')
        })
    }
    catch (e) {
        console.log(e)
        console.log('Failed to connect database!!!')
    }
}

start()