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
        console.debug('about to basicFetch: ' + url, 'cache: ' + init?.cache)
        const promise = fetch(url, init)
        promise.catch(err => {
            console.error('basicFetch failed: ' + url)
            console.error(err)
        })
        return promise
    }
    
    async jsonFetch<T>(uri: string, init?: RequestInit): Promise<T> {
        const response = await this.basicFetch(uri, init)
        return response.json()
    }
    
    async jsonFetchNoStore<T>(uri: string, init?: RequestInit): Promise<T> {
        const fullInit = {
            ...init,
            cache: 'no-store',
        }
        return this.jsonFetch(uri, fullInit as RequestInit)
    }
}
