'use server'

import { UUID, randomUUID } from 'crypto'
import { List } from './types'

// todo: connect to firebase

let lists: List[] = [
    {
        id: randomUUID(),
        name: 'movies'
    },
    {
        id: randomUUID(),
        name: 'todo'
    },
    {
        id: randomUUID(),
        name: 'creds'
    },
]

export async function getAllLists(): Promise<List[]> {
    console.log('about to fetch lists')
    await new Promise(resolve => setTimeout(resolve, 500))

    console.log('fetched lists', lists)
    return lists
}

export async function addList(name: string) {
    console.log('about to add list', name)
    await new Promise(resolve => setTimeout(resolve, 500))
    lists.push({
        id: randomUUID(),
        name,
    })
    console.log('added list', name)
    return lists
}

export async function removeList(listId: UUID) {
    console.log('about to remove list', listId)
    await new Promise(resolve => setTimeout(resolve, 500))
    lists = lists.filter(list => list.id !== listId)
    console.log('removed list', listId)
    return lists
}