import { buildResponse } from '@/app/lib/api'
import { shmoneyDb } from '@/app/shmoney/db/shmoneyDb'

console.log('ENVIS3: GOOGLE_APPLICATION_CREDENTIALS = ', process.env.GOOGLE_APPLICATION_CREDENTIALS)

interface Params {
    id: string;
}

export async function GET(_request: Request, { params }: { params: Params }) {
    const expenses = await shmoneyDb.getExpenses()
    const expense = expenses.find(ex => ex.id === params.id) ?? null
    return buildResponse(expense)
}
