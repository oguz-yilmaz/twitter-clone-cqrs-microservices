import request from 'supertest'
import { app } from '../src/app'

it('returns 201 on successfully signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201)
})

it('returns 400 with an invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test',
            password: 'password'
        })
        .expect(400)
})

it('returns 400 with an invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'one'
        })
        .expect(400)
})

it('returns 400 with missing credentials', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com'
        })
        .expect(400)

    await request(app)
        .post('/api/users/signup')
        .send({
            password: 'te'
        })
        .expect(400)
})

it('disallows duplicate emails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201)

    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(400)
})

it('sets a cookie after successful signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })

    expect(response.get('Set-Cookie')).toBeDefined()
})