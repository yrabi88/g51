import Col from '@/app/components/layout/Col'
import { UUID } from 'crypto'
import { List } from '../types'
import { addListItem, getList } from '../serverActions'
import TextInput from '@/app/components/basic/textInput/TextInput'
import Button from '@/app/components/basic/button/Button'
import Row from '@/app/components/layout/Row'
import { Metadata } from 'next'
import Link from 'next/link'

type Params = {listId: UUID}

async function getListSafe(listId: UUID): Promise<List | undefined> {
    let list: List | undefined
    try {
        list = await getList(listId)
    }
    catch (err) {
        console.error('failed to get list items', err)
    }
    return list
}

export async function generateMetadata(
    { params }: {params: Params},
  ): Promise<Metadata> {
    const listId = (await params).listId
    const list = await getListSafe(listId)
   
    return {
      title: (list?.name ?? 'Nope') + ' | List',
    }
  }

export default async function Page({params}: {params: Promise<Params>})  {
    const { listId } = await params
    const list = await getListSafe(listId)
    if (!list) {
        return (
            <div className='text-xl'>Could not find list: { listId }</div>
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