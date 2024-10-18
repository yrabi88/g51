import { buildResponse } from '@/app/lib/api'
import { shmoneyDb } from '../../db/shmoneyDb'

// import { expenses } from './mocks'

// export async function GET() {
//     return buildResponse(expenses)
// }

console.log('ENVIS2: GOOGLE_APPLICATION_CREDENTIALS = ', process.env.GOOGLE_APPLICATION_CREDENTIALS)

export async function GET(): Promise<Response> {
    const expenses = await shmoneyDb.getExpenses()
    // console.log({expenses})
    return buildResponse(expenses)
}   
