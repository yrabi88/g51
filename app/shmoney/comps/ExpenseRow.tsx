import { Expense } from '@/app/shmoney/lib/types'

interface Props {
    expense: Expense;
}

type CellProps = React.PropsWithChildren

function Cell(props: CellProps) {
    const { children } = props
    return (
        <div className="border-b border-b-solid px-2">{ children }</div>
    )
}

export default function ExpenseRow(props: Props) {
    const { title, amount, userId, currency, paidAtIso } = props.expense
    const paidAt = new Date(paidAtIso).toDateString()
    return (
        <>
            <Cell>{ paidAt }</Cell>
            <Cell><span className="capitalize">{ userId }</span></Cell>
            <Cell>{ title }</Cell>
            <Cell>{ amount } { currency }</Cell>
        </>
    )
}
