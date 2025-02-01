'use client'

import Col from '@/app/components/layout/Col'
import { ListItem } from '../types'
import { addListItem, getListItems, removeListItem } from '../serverActions'
import TextInput from '@/app/components/basic/textInput/TextInput'
import Button from '@/app/components/basic/button/Button'
import Row from '@/app/components/layout/Row'
import Link from 'next/link'
import { PropsWithChildren, useEffect, useState } from 'react'

// todo: code style

interface Props {
    listId: string
}

const Contr = (props: PropsWithChildren) => (
    <Col className='p-5 bg-white h-screen text-gray-600 gap-3'>
        {props.children}
    </Col>
)

type RemoveItemHandler = (itemId: string) => Promise<unknown>

function renderItems(items: ListItem[], onRemoveItem: RemoveItemHandler) {
    return items.map(item => {
        return (
            <Row key={item.id} className='gap-2'>
                <div>{item.title as string ?? 'noname'}</div>
                <div className='cursor-pointer' onClick={() => onRemoveItem(item.id)}>[x]</div>
            </Row>
        )
    })
}

function buildValuesConcat(listItem: ListItem) {
    return Object.values(listItem).map(v => v + '').join(' ')
}

const emptyArr: unknown[] = []

export default function ListPage({listId}: Props)  {

    const [textFilter, setTextFilter] = useState('')
    const [loading, setLoading] = useState(true)
    const [fetching, setFetching] = useState(false)
    const [listItems, setListItems] = useState(emptyArr as ListItem[])
    const [stale, setStale] = useState(true)

    useEffect(() => {
        if (!stale) return;
        setFetching(true)
        getListItems(listId)
            .then(_listItems => _listItems.map(listItem => ({
                ...listItem,
                valuesConcat: buildValuesConcat(listItem),
            })))
            .then(setListItems)
            .finally(() => (setFetching(false), setStale(false), setLoading(false)))
    }, [ listId, stale ])

    if (loading) {
        return (
            <Contr>
                <div className='text-xl'>Loading list data ...</div>
            </Contr>
        )
    }

    if (!listItems) {
        return (
            <Contr>
                <div className='text-xl'>Could not find list: { listId }</div>
            </Contr>
        )
    }

    const filteredItems = listItems.filter(item => (item.valuesConcat as string).includes(textFilter))

    const handleRemoveItem = async (itemId: string) => {
        await removeListItem(itemId)
        setStale(true)
    }

    const addItem = async (formData: FormData): Promise<void> => {
        await addListItem(formData)
        setStale(true)
    }
    return (
        <Col className='p-5 bg-white h-screen text-gray-600 gap-3'>
            <Col>
                <Row className='text-md text-gray-500 gap-1'>
                    <Link href="/lista">Lists</Link>
                    <span>&gt;</span>
                </Row>
                <div className='text-4xl'>{listId}</div>
            </Col>
            <Row>
                <TextInput label="Filter" value={textFilter} onChange={e => setTextFilter(e.target.value)} />
            </Row>
            <Col className='min-h-60'>
                {fetching
                    ? <span className='text-lg'>Refetching items..</span>
                    : renderItems(filteredItems, handleRemoveItem)
                }
            </Col>
            <form action={addItem}>
                <Row className='gap-3 items-end'>
                    <TextInput className='hidden' name="listId" value={listId} readOnly />
                    <TextInput label="Title" name="itemTitle" />
                    <Button type="submit">Add Item</Button>
                </Row>
            </form>
        </Col>
    )
}