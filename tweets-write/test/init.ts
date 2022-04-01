import {MongoMemoryServer} from "mongodb-memory-server"
import mongoose from "mongoose"
jest.mock('@events/producers/TweetCreatedEventProducer')

declare global {
    var login: (app: any) => any;
}

let mongo: any
beforeAll(async () => {
    mongo = new MongoMemoryServer()
    const mongoUri = await mongo.getUri()

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
    })
})

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections()

    for (const collection of collections) {
        await collection.deleteMany({})
    }
})

afterAll(async () => {
    await mongo.stop()
    await mongoose.connection.close()
})

// @ts-ignore
global.login = function (app) {
    Object.defineProperty(app.request, 'currentUser', {
        configurable: true,
        enumerable: true,
        get () {
            return {
                id: '1234',
                username: 'testuser',
                email: 'test@test.com',
                firstname: 'John',
                lastname: 'Doe'
            }
        }
    })

    return app
}