import { expenses } from '@/app/shmoney/api/expenses/mocks'
import { buildResponse } from '@/app/lib/api'

interface Params {
    id: string;
}

export async function GET(_request: Request, { params }: { params: Params }) {
    const expense = expenses.find(ex => ex.id === params.id) ?? null
    return buildResponse(expense)
}
