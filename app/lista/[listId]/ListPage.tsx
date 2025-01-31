'use client'

import Col from '@/app/components/layout/Col'
import { UUID } from 'crypto'
import { List } from '../types'
import { addListItem } from '../serverActions'
import TextInput from '@/app/components/basic/textInput/TextInput'
import Button from '@/app/components/basic/button/Button'
import Row from '@/app/components/layout/Row'
import Link from 'next/link'
import { PropsWithChildren, useEffect, useState } from 'react'
import { getListSafe } from './listUtils'

interface Props {
    listId: UUID
}

const Contr = (props: PropsWithChildren) => (
    <Col className='p-5 bg-white h-screen text-gray-600 gap-3'>
        {props.children}
    </Col>
)

export default function ListPage({listId}: Props)  {

    const [beforeFetch, setBeforeFetch] = useState(true)
    const [loading, setLoading] = useState(false)
    const [list,setList] = useState<List>()

    useEffect(() => {
        setBeforeFetch(false)
        setLoading(true)
        getListSafe(listId).then(_list => {
            if (_list) setList(_list)
        }).finally(() => setLoading(false))
    }, [ listId ])

    if (loading || beforeFetch) {
        return (
            <Contr>
                <div className='text-xl'>Loading list data ...</div>
            </Contr>
        )
    }

    if (!list) {
        return (
            <Contr>
                <div className='text-xl'>Could not find list: { listId }</div>
            </Contr>
        )
    }


    return (
        <Col className='p-5 bg-white h-screen text-gray-600 gap-3'>
            <Row className='text-md text-gray-500 gap-1'>
                <Link href="/lista">Lists</Link>
                <span>&gt;</span>
            </Row>
            <div className='text-4xl'>{list.name}</div>
            <Col>
                {list.items.map(item => {
                    return (
                        <div key={item.id} className=''>{item.title}</div>
                    )
                })}
            </Col>
            <form action={addListItem}>
                <Row className='gap-3 items-end'>
                    <TextInput className='hidden' name="listId" value={listId} readOnly />
                    <TextInput label="Title" name="itemTitle" />
                    <Button type="submit">Add Item</Button>
                </Row>
            </form>
        </Col>
    )
}