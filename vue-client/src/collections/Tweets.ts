import { Requester } from '@/lib/api/Requester'

interface TweetUser {
    id: number
    username: string
    name: string
}

interface Tweet {
    id: number
    user: TweetUser
    content: string
    created_at: Date
}

class Tweets {
    resourceUrl = 'http://localhost:3704/tweets'

    constructor(private requester: Requester) {}

    async load (): Promise<Tweet[]> {
        const data = await this.requester.get(this.resourceUrl)

        return this.createCollection(data)
    }

    createCollection (data: any): Tweet[] {
        const res = []

        for (const dataKey in data) {
            const {id, user, content, created_at} = data[dataKey]

            res.push({id, user, content, created_at: new Date(created_at) })
        }

        return res
    }
}

export default new Tweets(new Requester()) as Tweets