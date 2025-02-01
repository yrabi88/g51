'use client'

import Col from '@/app/components/layout/Col'
import { UUID } from 'crypto'
import { List, ListItem } from '../types'
import { addListItem, removeListItem } from '../serverActions'
import TextInput from '@/app/components/basic/textInput/TextInput'
import Button from '@/app/components/basic/button/Button'
import Row from '@/app/components/layout/Row'
import Link from 'next/link'
import { PropsWithChildren, useEffect, useState } from 'react'
import { getListSafe } from './listUtils'

// todo: code style

interface Props {
    listId: UUID
}

const Contr = (props: PropsWithChildren) => (
    <Col className='p-5 bg-white h-screen text-gray-600 gap-3'>
        {props.children}
    </Col>
)

type RemoveItemHandler = (itemId: UUID, listId: UUID) => Promise<unknown>

function renderItems(list: List, items: ListItem[], onRemoveItem: RemoveItemHandler) {
    return items.map(item => {
        return (
            <Row key={item.id} className='gap-2'>
                <div>{item.title}</div>
                <div className='cursor-pointer' onClick={() => onRemoveItem(item.id, list.id)}>[x]</div>
            </Row>
        )
    })
}

export default function ListPage({listId}: Props)  {

    const [textFilter, setTextFilter] = useState('')
    const [loading, setLoading] = useState(true)
    const [fetching, setFetching] = useState(false)
    const [list, setList] = useState<List>()
    const [stale, setStale] = useState(true)

    useEffect(() => {
        if (!stale) return;
        setFetching(true)
        getListSafe(listId).then(_list => {
            if (_list) setList(_list)
        }).finally(() => (setFetching(false), setStale(false), setLoading(false)))
    }, [ listId, stale ])

    if (loading) {
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

    const filteredItems = list.items.filter(item => item.title.includes(textFilter))

    const handleRemoveItem = async (itemId: UUID, listId: UUID) => {
        await removeListItem(itemId, listId)
        setStale(true)
    }


    return (
        <Col className='p-5 bg-white h-screen text-gray-600 gap-3'>
            <Col>
                <Row className='text-md text-gray-500 gap-1'>
                    <Link href="/lista">Lists</Link>
                    <span>&gt;</span>
                </Row>
                <div className='text-4xl'>{list.name}</div>
            </Col>
            <Row>
                <TextInput label="Filter" value={textFilter} onChange={e => setTextFilter(e.target.value)} />
            </Row>
            <Col className='min-h-60'>
                {fetching
                    ? <span className='text-lg'>Refetching items..</span>
                    : renderItems(list, filteredItems, handleRemoveItem)
                }
            </Col>
            <form action={async formData => {
                await addListItem(formData)
                setStale(true)
                }}>
                <Row className='gap-3 items-end'>
                    <TextInput className='hidden' name="listId" value={listId} readOnly />
                    <TextInput label="Title" name="itemTitle" />
                    <Button type="submit">Add Item</Button>
                </Row>
            </form>
        </Col>
    )
}