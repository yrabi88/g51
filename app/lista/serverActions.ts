'use server'

import { UUID } from 'crypto'
import { List, ListItem } from './types'
// import { revalidatePath } from 'next/cache'
import db from './lib/listaDb'

export async function getAllLists(): Promise<List[]> {
    return db.getAllLists()
}

export async function addList(name: string) {
    return db.addList(name)
}

export async function addListItem(formData: FormData): Promise<ListItem | undefined> {
    const listId = formData.get('listId') as UUID
    const formValues = Array.from(formData.entries())
    console.log({formValues})
    // todo: support lists with dynamic fields

    const itemTitle = formData.get('itemTitle')
    if (!listId || !itemTitle || typeof itemTitle !== 'string') {
        console.error('bad request. cannot add list item.')
        return;
    }

    const newItem = await db.addListItem({list_id: listId, title: itemTitle})
    // revalidatePath('/lista' + listId)
    return newItem
}

export async function removeListItem(itemId: string) {
    await db.removeListItem(itemId)
    // revalidatePath('/lista' + listId)
}

export async function removeList(listId: UUID) {
    db.removeList(listId)
}

export async function getList(listId: string): Promise<List> {
    return db.getList(listId)
}

export async function getListItems(listId: string): Promise<ListItem[]> {
    return await db.getListItems(listId)
}
