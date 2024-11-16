'use server'

import { revalidatePath } from 'next/cache'
import { shmoneyDb } from '../db/shmoneyDb'
import { NewExpenseDto, CurrencyId } from '@/app/shmoney/lib/types'

// todo: move this to new file: shmoney/serverActions/expenses/create.ts and put this in

export async function createExpense(formData: FormData) {
    
    // todo: verify formData inputs
    
    // todo: is there a way to receive an input class instead of generic FormData?
    
    console.log('createExpense action started')
    console.log('title', formData.get('title'))
    console.log('paidAtIso', formData.get('paidAtIso'))
    console.log('amount', formData.get('amount'))

    const expenseDto: NewExpenseDto = {
        userId: formData.get('user') as string,
        title: formData.get('title') as string,
        amount: parseFloat(formData.get('amount') as string),
        currency: formData.get('currency') as CurrencyId,
        paidAtIso: formData.get('paidAt') as string,
    }

    const expense = await shmoneyDb.createExpense(expenseDto)

    revalidatePath('/shmoney')

    return expense
}