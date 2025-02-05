'use client'

import { useEffect, useState } from 'react'
import Col from '../../components/layout/Col'
import { addList, getAllLists, removeList } from '../serverActions'
import TextInput from '../../components/basic/textInput/TextInput'
import { List } from '../types'
import Row from '@/app/components/layout/Row'
import Link from 'next/link'
import Button from '@/app/components/basic/button/Button'
import XMark from '@/app/icons/x-mark.svg'

// todo: code style

interface Props {
    initialLists: List[]
}
interface ListInfoProps {
    list: List
    onRemove: () => void
}

function ListInfo(props: ListInfoProps) {
    const { list, onRemove } = props
    return (
        <Link href={`/lista/${list.id}`}>
            <Row key={list.id} className='gap-5 p-3 bg-amber-200 shadow-sm justify-between'>
                {list.name}
                <XMark className='cursor-pointer' onClick={ (e: Event) => (onRemove(), e.preventDefault())}/>
            </Row>
        </Link>
    )
}

export default function Home(props: Props) {
    const [lists, setLists] = useState<List[]>(props.initialLists)
    const [isListsStale, setListsStale] = useState<boolean>(false)
    const [newListName, setNewListName] = useState<string>('')
    useEffect(() => {
        if (isListsStale) {
            getAllLists()
                .then(_lists => setLists(_lists))
                .catch(err => {
                    console.error('failed ot get all lists', err)
                    // todo: handl error (retry and remove finally block)
                })
                .finally(() => setListsStale(false))
        }
    }, [isListsStale])

    const addListAndRefetch = async () => {
        try {
            await addList(newListName)
            setListsStale(true)
            setNewListName('')
        } catch(err) {
            console.error('failed to add list', newListName, err)
        }
    }

const removeListAndRefetch = async (listId: string) => {
        try {
            await removeList(listId)
            setListsStale(true)
        } catch(err) {
            console.error('failed to remove list', listId, err)
        }
    }
    
    return (
        <Col className="p-7 gap-10 bg-gray-100 text-gray-600 h-screen">
            <Col className="gap-3 w-5/6 items-stretch">
                <div className={`text-2xl`}>My Lists</div>
                <Col className="gap-2 items-stretch">
                    { lists.map((list) => {
                        return (
                            <ListInfo
                                key={list.id}
                                list={list}
                                onRemove={() => removeListAndRefetch(list.id)}
                            />
                        )
                    }) }
                </Col>
            </Col>
            <Col className="gap-2">
                <TextInput label="List Name" value={newListName} onChange={e => setNewListName(e.target.value)} />
                <Button disabled={!newListName} className={`p-2 text-lg font-bold cursor-pointer bg-blue-200`} onClick={addListAndRefetch}>
                    Create List
                </Button>
            </Col>
        </Col>
    )
}