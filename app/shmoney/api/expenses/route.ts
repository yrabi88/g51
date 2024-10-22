import { buildResponse } from '@/app/lib/api'
import { shmoneyDb } from '../../db/shmoneyDb'

export const dynamic = 'force-dynamic'

export async function GET(): Promise<Response> {
    const expenses = await shmoneyDb.getExpenses()
    return buildResponse(expenses)
}   
