import Col from '@/app/components/layout/Col'
import Row from '@/app/components/layout/Row'
import { Expense } from '@/app/shmoney/lib/types'

interface Props {
    expense: Expense;
}

type CellProps = React.PropsWithChildren

function Cell(props: CellProps) {
    const { children } = props
    return (
        <div className="">{ children }</div>
    )
}

export default function ExpensBox(props: Props) {
    const { title, amount, userId, currency, paidAtIso } = props.expense
    const paidAt = new Date(paidAtIso).toDateString()
    return (
        <Col className="rounded border border-teal-800 bg-stone-100 p-2">
            <Row className='gap-4'>
                <Cell>{ paidAt }</Cell>
                <Cell><span className="capitalize">{ userId }</span></Cell>
            </Row>
            <Cell>{ title }</Cell>
            <Cell>{ amount } { currency }</Cell>
        </Col>
    )
}
