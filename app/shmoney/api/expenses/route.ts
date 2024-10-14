import { buildResponse } from '@/app/lib/api'
import { shmoneyDb } from '../../db/shmoneyDb'

// import { expenses } from './mocks'

// export async function GET() {
//     return buildResponse(expenses)
// }

export async function GET(): Promise<Response> {
    const expenses = await shmoneyDb.getExpenses()
    // console.log({expenses})
    return buildResponse(expenses)
}   
