import shmoneyApiClient from './api/shmoneyApiClient'
import ExpenseRow from './comps/ExpenseRow'
import styles from './styles.module.css';

export const dynamic = 'force-dynamic' // todo: check if build works without this
// 'auto' | 'force-dynamic' | 'error' | 'force-static'

export default async function Page() {
    const expenses = await shmoneyApiClient.getExpenses()

    return (
        <div className={`flex flex-col items-center pt-10 shmoney gap-20 ${styles.main_font}`}>
            <div className={`text-6xl`}>Shmoney</div>
            <div className={`grid grid-cols-4 gap-y-4`}>
                { expenses.map((row) => <ExpenseRow key={row.id} expense={row} />) }
            </div>
        </div>
    )
}