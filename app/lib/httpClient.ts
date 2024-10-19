const port = process.env.PORT || 3000
const baseUrl = `http://localhost:${port}`

export class HttpClient {
    
    baseUri;
    baseUrl;
    
    constructor(baseUri: string) {
        this.baseUri = baseUri
        this.baseUrl = baseUrl + baseUri
    }

    basicFetch(uri: string, init?: RequestInit): Promise<Response> {
        const url = this.baseUrl + uri
        console.log('basicFetch: ' + url)
        const promise = fetch(url, init)
        promise.catch(err => {
            console.error('failed to fetch: ' + url)
            console.error(err)
        })
        return promise
    }
    
    async jsonFetch<T>(uri: string, init?: RequestInit): Promise<T> {
        const response = await this.basicFetch(uri, init)
        return response.json()
    }

}
