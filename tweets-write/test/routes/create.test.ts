import request from 'supertest'
import { app } from '../../src/app'
import { Tweet } from '@models/Tweet'
// will be mocked by jest
import { tweetCreatedProducer } from '@events/producers/TweetCreatedEventProducer'

let tweetData: any
beforeEach(async () => {
    tweetData = {
        content: 'test content new',
        userId: '62377aeaa0342b0019a98f1K'
    }
})

it('gets 201 created response after sending post to create endpoint', async () => {
    const loggedInApp = login(app)

    await request(loggedInApp)
        .post('/api/tweets/wr')
        .send(tweetData)
        .expect(201)
})

it('Creates a tweet with valid data', async () => {
    const loggedInApp = login(app)

    let tweets = await Tweet.find({})
    expect(tweets.length).toEqual(0)

    await request(loggedInApp)
        .post('/api/tweets/wr')
        .send(tweetData)
        .expect(201)

    tweets = await Tweet.find({})

    expect(tweets.length).toEqual(1)
    expect(tweets[0].content).toEqual('test content new')
    expect(tweets[0].userId).toEqual('62377aeaa0342b0019a98f1K')
})

it('Calls publisher after creating the tweet', async () => {
    const loggedInApp = login(app)

    await request(loggedInApp)
        .post('/api/tweets/wr')
        .send(tweetData)

    expect(tweetCreatedProducer.send).toHaveBeenCalled();
})