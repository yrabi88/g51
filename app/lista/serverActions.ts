'use server'

import { UUID } from 'crypto'
import { List, ListItem } from './types'
import { revalidatePath } from 'next/cache'
import db from './lib/listaDb'

export async function getAllLists(): Promise<List[]> {
    return db.getAllLists()
}

export async function addList(name: string) {
    return db.addList(name)
}

export async function addListItem(formData: FormData): Promise<ListItem | undefined> {
    const listId = formData.get('listId') as UUID
    const itemTitle = formData.get('itemTitle')
    if (!listId || !itemTitle || typeof itemTitle !== 'string') {
        console.error('bad request. cannot add list item.')
        return;
    }

    const newItem = db.addListItem(listId, itemTitle)
    // revalidatePath('/lista' + listId)
    return newItem
}

export async function removeListItem(itemId: UUID, listId: UUID) {
    await db.removeListItem(itemId, listId)
    // revalidatePath('/lista' + listId)
}

export async function removeList(listId: UUID) {
    db.removeList(listId)
}

export async function getList(listId: UUID): Promise<List> {
    return db.getList(listId)
}
