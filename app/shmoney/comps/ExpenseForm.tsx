import Form from 'next/form'
import Row from '@/app/components/layout/Row'
import TextInput from '@/app/components/basic/textInput/TextInput'
import Col from '@/app/components/layout/Col'
import { CurrencyId } from '../lib/types'
import { createExpense } from '../api/shmoneyServerActions'

const buildField = (name: string, defaultValue?: string | number) => ({ name, defaultValue })

const fields = [
    buildField('paidAt', '2024-10-28'),
    buildField('user', 'yakir'),
    buildField('title', 'Oranges'),
    buildField('amount', '123'),
    buildField('currency', CurrencyId.ILS),
]

export default function ExpenseForm() {
    return (
        <Form action={createExpense}>
            <Col className="gap-5 p-7">
                <Row className="gap-5 flex-wrap">
                    { fields.map(fld => (
                        <TextInput
                            key={fld.name}
                            name={fld.name} defaultValue={fld.defaultValue}
                        />

                    )) }
                </Row>
                <button type="submit" className="bg-red-600 p-4">Create</button>
            </Col>
        </Form>
    )
}
