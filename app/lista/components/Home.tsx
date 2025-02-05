'use client'

import { useEffect, useState } from 'react'
import Col from '../../components/layout/Col'
import { addList, getAllLists, removeList } from '../serverActions'
import TextInput from '../../components/basic/textInput/TextInput'
import { List } from '../types'
import Row from '@/app/components/layout/Row'
import Link from 'next/link'
import Button from '@/app/components/basic/button/Button'

// todo: code style

interface Props {
    initialLists: List[]
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
        <Col className="p-7 gap-10 items-center bg-gray-100 text-gray-600 h-screen main-font">
            <div className={`text-6xl`}>Lista</div>
            <Col className="gap-3">
                <div className={`text-2xl`}>My Lists</div>
                <Col className="gap-2">
                    { lists.map((list) => {
                        return (
                            <Row key={list.id} className='gap-5'>
                                <Link href={`/lista/${list.id}`}>
                                    &gt; {list.name}
                                </Link>
                                <div className='cursor-pointer' onClick={() => removeListAndRefetch(list.id)}>[x]</div>
                            </Row>
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