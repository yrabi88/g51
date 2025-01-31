import { List } from '../types'
import { getList } from '../serverActions'
import { UUID } from 'crypto'

export async function getListSafe(listId: UUID): Promise<List | undefined> {
    let list: List | undefined
    try {
        list = await getList(listId)
    }
    catch (err) {
        console.error('failed to get list items', err)
    }
    return list
}
