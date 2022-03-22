interface IModel {
    id: number
}

export class Requester {
    async post (url: string, data: any): Promise<any> {
        return this.load(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(data)
        })
    }

    async get(url: string): Promise<any> {
        return await this.load(url)
    }

    private async load (url: string, options = {}): Promise<any> {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            ...options
        })

        const resp = await response.json()

        if (!isModelCollection<IModel>(resp)) {
            throw new Error('Invalid data returned!')
        }

        return resp
    }
}

function isModelCollection<T> (resp: T[]): resp is T[]
{
    let res = true

    if (Array.isArray(resp)) {
        for (const element of resp) {
            if (!("id" in element)) {
                res = false
            }
        }
    }

    return res ?? false
}