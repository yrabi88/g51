import { buildResponse } from '@/app/lib/api'
import { shmoneyDb } from '@/app/shmoney/db/shmoneyDb'

interface Params {
    id: string;
}

export async function GET(_request: Request, { params }: { params: Params }) {
    const expenses = await shmoneyDb.getExpenses()
    const expense = expenses.find(ex => ex.id === params.id) ?? null
    return buildResponse(expense)
}
