import { Expense, CurrencyId } from '@/app/shmoney/lib/types'

const createExpense = (
    id: string,
    userId: string,
    title: string,
    amount: number,
    currency: CurrencyId,
    paidAt: Date,
): Expense => ({
    id,
    paidAtIso: paidAt.toISOString(),
    userId,
    title,
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
    createExpense('3', 'aya', 'Honey', 28, CurrencyId.ILS,
        new Date(Date.now() - 3600000 * 31),
    ),
    createExpense('4', 'yakir', 'Cow', 28, CurrencyId.ILS,
        new Date(Date.now() - 3600000 * 48),
    ),
]
