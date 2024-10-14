import { Expense, CurrencyId } from '@/app/shmoney/lib/types';
import { firestore } from '@/app/lib/firestore'

const expensesRef = firestore.collection('expenses');

interface ExpenseDto {
    id: string;
    amount: number;
    currency: CurrencyId;
    paid_at_iso: string;
    title: string;
    user: string;
}

function buildExpenseFromDoc(docId: string, expenseDto: ExpenseDto): Expense {
    return {
        id: docId,
        ownerId: expenseDto.user,
        name: expenseDto.title,
        amount: expenseDto.amount,
        currency: expenseDto.currency,
        date: expenseDto.paid_at_iso,
    }
}

async function getExpenses(): Promise<Expense[]> {
    // expensesRef.where('foo', '==', 'bar').get().then(querySnapshot => {
    
    const querySnap = await expensesRef.get()

    const expenses: Expense[] = []

    querySnap.forEach(docSnap => {
        // console.log(`Found document at ${docSnap.ref.path}`);
        const docData = docSnap.data()
        if (!docData) return;
        // console.log({
        //     docData,
        // });
        expenses.push(buildExpenseFromDoc(
            docSnap.id,
            docData as unknown as ExpenseDto, // todo: type safety
        ))
    });

    return expenses
}

export const shmoneyDb = {
    getExpenses,
}
