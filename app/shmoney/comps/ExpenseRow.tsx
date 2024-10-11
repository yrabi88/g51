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
    const { name, amount, ownerId, currency, date: dateIso } = props.expense
    const date = new Date(dateIso).toDateString()
    return (
        <>
            <Cell>{ date }</Cell>
            <Cell><span className="capitalize">{ ownerId }</span></Cell>
            <Cell>{ name }</Cell>
            <Cell>{ amount } { currency }</Cell>
        </>
    )
}
