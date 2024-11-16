import { buildResponse } from '@/app/lib/api'
import { ParamsWrapper } from '@/app/lib/types'
import { shmoneyDb } from '@/app/shmoney/db/shmoneyDb'

interface Params {
    id: string;
}

export async function GET(_request: Request, paramsWrapper: ParamsWrapper<Params>) {
    const params = await paramsWrapper.params;
    const expenses = await shmoneyDb.getExpenses()
    const expense = expenses.find(ex => ex.id === params.id) ?? null
    return buildResponse(expense)
}
