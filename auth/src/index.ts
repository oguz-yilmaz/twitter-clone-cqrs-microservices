import mongoose from 'mongoose'
import { app } from "./app"
import dotenv from 'dotenv'

dotenv.config();

const start = async () => {
    console.log('Starting up auth service ...')

    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY env variable needs to be defined.')
    }

    try {
        await mongoose.connect(process.env.MONGO_URI!)

        app.listen(3015, () => {
            console.log('listening on port 3015')
        })
    }
    catch (e) {
        console.log(e)
        console.log('Failed to connect database!!!')
    }
}

start()