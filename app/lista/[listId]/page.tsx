import { UUID } from 'crypto'

import { Metadata } from 'next'
import ListPage from './ListPage'
import { getListSafe } from './listUtils'

type Params = {listId: UUID}

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
    return <ListPage listId={listId} />
}
