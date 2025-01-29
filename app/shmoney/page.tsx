import shmoneyApiClient from './api/shmoneyApiClient'
import ExpenseForm from './comps/ExpenseForm'
// import ExpenseRow from './comps/ExpenseRow'
import ExpenseBox from './comps/ExpenseBox'
import styles from './styles.module.css';

export const dynamic = 'force-dynamic' // todo: check if build works without this
// 'auto' | 'force-dynamic' | 'error' | 'force-static'

export default async function Page() {
    const expenses = await shmoneyApiClient.getExpenses()

    // console.log(expenses.map(ex => `${ex.id} - ${ex.title}`))

    return (
        <div className={`flex flex-col items-center pt-10 gap-7 ${styles.main_font} bg-yellow-200 text-gray-800`}>
            <div className={`text-6xl text-teal-900`}>Shmoney</div>
            <ExpenseForm />
            <div className={`flex flex-col gap-y-4`}>
                { expenses.map((row) => <ExpenseBox key={row.id} expense={row} />) }
            </div>
            {/* <div className={`grid grid-cols-4 gap-y-4`}>
                { expenses.map((row) => <ExpenseRow key={row.id} expense={row} />) }
            </div> */}
        </div>
    )
}