import { HttpClient } from '@/app/lib/httpClient'
import { Expense } from '@/app/shmoney/lib/types'

const shmoneyHttpClient = new HttpClient('/shmoney/api')

class ShmoneyApiClient {
    jsonFetch;
    
    constructor() {
        this.jsonFetch = shmoneyHttpClient.jsonFetch.bind(shmoneyHttpClient)
    }

    getExpenses() {
        return this.jsonFetch<Expense[]>('/expenses')
    }
}

const shmoneyApiClient = new ShmoneyApiClient()

export default shmoneyApiClient
