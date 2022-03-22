import {MongoMemoryServer} from "mongodb-memory-server"
import mongoose from "mongoose"
import {app} from "../src/app"
import request from 'supertest'

declare global {
    var signin: () => Promise<string[]>;
}

let mongo: any

beforeAll(async () => {
    process.env.JWT_KEY = 'asdf'

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

global.signin = async () => {
    const email = 'test@test.com'
    const password = 'password'

    const signupResponse = await request(app)
        .post('/api/users/signup')
        .send({ email, password })
        .expect(201);

    return signupResponse.get('Set-Cookie')
}