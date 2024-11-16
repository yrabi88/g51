import { HttpClient } from '@/app/lib/httpClient'
import { Expense } from '@/app/shmoney/lib/types'

const baseUri = '/shmoney/api'
const shmoneyHttpClient = new HttpClient(baseUri)

class ShmoneyApiClient {
    jsonFetch;
    jsonFetchNoStore;
    
    constructor() {
        this.jsonFetch = shmoneyHttpClient.jsonFetch.bind(shmoneyHttpClient)
        this.jsonFetchNoStore = shmoneyHttpClient.jsonFetchNoStore.bind(shmoneyHttpClient)
    }

    getExpenses() {
        return this.jsonFetchNoStore<Expense[]>('/expenses')
    }
}

const shmoneyApiClient = new ShmoneyApiClient()

export default shmoneyApiClient
