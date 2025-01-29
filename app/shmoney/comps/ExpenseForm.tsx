import Form from 'next/form'
import Row from '@/app/components/layout/Row'
import TextInput from '@/app/components/basic/textInput/TextInput'
import Col from '@/app/components/layout/Col'
import { CurrencyId } from '../lib/types'
import { createExpense } from '../api/shmoneyServerActions'
import Button from '@/app/components/basic/button/Button'

const buildField =
    (name: string, label: string, defaultValue?: string | number) =>
        ({ name, label, defaultValue })

const fields = [
    buildField('title', 'Title', 'Oranges'),
    buildField('amount', 'Amount', '123'),
    buildField('paidAt', 'Paid At', '2024-10-28'),
    buildField('user', 'User', 'yakir'),
    buildField('currency', 'Currency', CurrencyId.ILS),
]

export default function ExpenseForm() {
    return (
        <Form action={createExpense}>
            <Col className="gap-5 p-7">
                <Row className="gap-5 flex-wrap">
                    { fields.map(fld => (
                        <TextInput
                            key={fld.name}
                            { ...fld }
                        />

                    )) }
                </Row>
                <Button type="submit" className="">Create</Button>
            </Col>
        </Form>
    )
}
