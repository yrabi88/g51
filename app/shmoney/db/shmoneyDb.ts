import { Expense, CurrencyId, NewExpenseDto } from '@/app/shmoney/lib/types';
import { firestore } from '@/app/lib/firestore'

const expensesRef = firestore.collection('expenses');

interface NewExpenseDoc {
    amount: number;
    currency: CurrencyId;
    paid_at_iso: string;
    title: string;
    user: string;
}

interface ExpenseDocData extends NewExpenseDoc {
    id: string;
}

function buildExpenseFromDoc(docId: string, expenseDocData: ExpenseDocData): Expense {
    return {
        id: docId,
        userId: expenseDocData.user,
        title: expenseDocData.title,
        amount: expenseDocData.amount,
        currency: expenseDocData.currency,
        paidAtIso: expenseDocData.paid_at_iso,
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
            docData as unknown as ExpenseDocData, // todo: type safety
        ))
    });

    return expenses
}

function buildNewExpenseDoc(newExpenseDto: NewExpenseDto): NewExpenseDoc {
    return {
        amount: newExpenseDto.amount,
        currency: newExpenseDto.currency,
        paid_at_iso: newExpenseDto.paidAtIso,
        title: newExpenseDto.title,
        user: newExpenseDto.userId,
    }
}

async function createExpense(newExpenseDto: NewExpenseDto): Promise<Expense> {
    
    const expenseDocToAdd = buildNewExpenseDoc(newExpenseDto)
    const docRef = await expensesRef.add(expenseDocToAdd)

    console.log(`Added document with name: ${docRef.id}`);
    const docSnap = await docRef.get()
    if (docSnap.exists) {
        const docData = docSnap.data() as Expense
        console.log(`created doc (${docSnap.id})`, JSON.stringify(docData))
        // docData.id = docSnap.id
        return docData
    }
    else {
        console.log('did not create doc?')
        // todo: what?
        throw Error(`Failed to create expense ${newExpenseDto.title}`)
    }
}

export const shmoneyDb = {
    getExpenses,
    createExpense,
}
