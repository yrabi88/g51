import { Expense, CurrencyId } from '@/app/shmoney/lib/types'

const createExpense = (
    id: string,
    ownerId: string,
    name: string,
    amount: number,
    currency: CurrencyId,
    date: Date,
): Expense => ({
    id,
    date: date.toISOString(),
    ownerId,
    name,
    amount,
    currency,
})

export const expenses: Expense[] = [
    createExpense('1', 'yakir', 'Milk', 36.9, CurrencyId.ILS,
        new Date(Date.now() - 3600000 * 60),
    ),
    createExpense('2', 'aya', 'Plants', 320, CurrencyId.ILS,
        new Date(Date.now() - 3600000 * 30),
    ),
    createExpense('2', 'aya', 'Honey', 28, CurrencyId.ILS,
        new Date(Date.now() - 3600000 * 31),
    ),
]
