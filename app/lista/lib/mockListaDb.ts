import { UUID, randomUUID } from 'crypto'
import { List, ListItem } from '../types'
import fs from 'fs'
import path from 'node:path'

// todo: code style
// todo: connect to firebase

const dbfilepath = path.resolve('./app/lista/fakeDb.json')
const getLocalStorage = () => JSON.parse(fs.readFileSync(dbfilepath).toString())
const updateLocalStorage = (allData: Record<string, unknown>) => fs.writeFileSync(dbfilepath, JSON.stringify(allData, null, 2))

function setupLists() {
    const ls = getLocalStorage()
    if (!ls.lists) {
        ls.lists = []
        updateLocalStorage(ls)
    }
}

setupLists()

const getListsFromLs = (): List[] => getLocalStorage().lists
const updateListsInLs = (lists: List[]) => updateLocalStorage({
    ...getLocalStorage(),
    lists,
})

async function getAllLists(): Promise<List[]> {
    console.log('about to fetch lists')
    await new Promise(resolve => setTimeout(resolve, 500))
    const lists = getListsFromLs()
    console.log('fetched lists', lists)
    return lists
}

async function addList(name: string) {
    console.log('about to add list', name)
    await new Promise(resolve => setTimeout(resolve, 500))
    const lists = getListsFromLs()
    const newList = {
        id: randomUUID(),
        name,
        items: [],
    }
    lists.push(newList)
    updateListsInLs(lists)
    console.log('added list', name)
    return newList
}

async function addListItem(listId: UUID, itemTitle: string): Promise<ListItem | undefined> {
    console.log('about to add list item', { listId, itemTitle})
    const newItem = { id: randomUUID(), title: itemTitle }
    const updatedLists = getListsFromLs()
        .map(list => list.id !== listId ? list : {
            ...list,
            items: list.items.concat([ newItem ])
        })
    updateListsInLs(updatedLists)
    console.log('added list item', { listId, itemTitle})
    return newItem
}

async function removeList(listId: UUID) {
    console.log('about to remove list', listId)
    await new Promise(resolve => setTimeout(resolve, 500))
    let lists = getListsFromLs()
    lists = lists.filter(list => list.id !== listId)
    updateListsInLs(lists)
    console.log('removed list', listId)
}

async function removeListItem(itemId: UUID, listId: UUID) {
    console.log('about to remove list item', listId)
    await new Promise(resolve => setTimeout(resolve, 100))
    let lists = getListsFromLs()
    lists = lists.map(list => list.id !== listId ? list : {
        ...list,
        items: list.items.filter(item => item.id !== itemId),
    })
    updateListsInLs(lists)
    console.log('removed list', listId)
}

async function getList(listId: UUID): Promise<List> {
    console.log('about to remove list', listId)
    await new Promise(resolve => setTimeout(resolve, 200))
    const lists = getListsFromLs()
    console.log(lists.map(l => l.id))
    const list = lists.find(list => list.id === listId)
    if (!list) {
        throw Error('did not find list ' + listId)
    }
    return list
}

const db = {
    getAllLists,
    addList,
    addListItem,
    removeList,
    removeListItem,
    getList,
}

export default db
