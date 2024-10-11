const baseUrl = 'http://localhost:3000'

export class HttpClient {
    
    baseUri;
    baseUrl;
    
    constructor(baseUri: string) {
        this.baseUri = baseUri
        this.baseUrl = baseUrl + baseUri
    }

    basicFetch(uri: string, init?: RequestInit): Promise<Response> {
        const url = this.baseUrl + uri
        return fetch(url, init)
    }
    
    async jsonFetch<T>(uri: string, init?: RequestInit): Promise<T> {
        const response = await this.basicFetch(uri, init)
        return response.json()
    }

}
