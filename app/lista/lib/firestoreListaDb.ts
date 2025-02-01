import { firestore } from '@/app/lib/firestore'

const listsRef = firestore.collection('lista_lists')
const listItemsRef = firestore.collection('lista_list_items')

import { List, ListItem, NewListItem } from '../types'
import { QuerySnapshot } from '@google-cloud/firestore'
// import { List, ListItem } from '../types'

// todo: code style

interface NewListDoc {
    name: string
}

interface ListDocData extends NewListDoc {
    id: string
}

const buildNewListDoc = (name: string): NewListDoc => ({ name })

function listFromDoc(docId: string, docData: ListDocData): List {
    return {
        id: docId,
        name: docData.name
    }
}

async function getAllLists(): Promise<List[]> {
    const querySnap = await listsRef.get()
    const lists: List[] = []
    querySnap.forEach(docSnap => {
        const docData = docSnap.data()
        if (docData) {
            const list = listFromDoc(docSnap.id, docData as ListDocData)
            lists.push(list)
        }
    })
    return lists
}


async function addList(name: string): Promise<List> {
    const listDocToAdd = buildNewListDoc(name)
    const docRef = listsRef.doc(name)
    const docData = await docRef.get()
    if (!docData.exists) {
        docRef.set(listDocToAdd)
    } else {
        throw Error('List name already in use.')
    }
    return { id: name, name }
}

async function getList(listName: string): Promise<List> {
    const listDoc = await listsRef.doc(listName).get()
    return listDoc.data() as List
}

async function removeList(listId: string) {
    await listsRef.doc(listId).delete()
    const listItemsSnapshot = await listItemsRef.where('list_id', '==', listId).get()
    await deleteDocsInBatch(listItemsSnapshot)
}

async function deleteDocsInBatch(snapshot: QuerySnapshot) {
  const batch = firestore.batch()
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref)
  });
  await batch.commit()
}

async function getListItems(listId: string): Promise<ListItem[]> {
    const snapshot = await listItemsRef.where('list_id', '==', listId).get()
    const listItems: ListItem[] = []
    snapshot.forEach(doc => {
        listItems.push({id: doc.id, ...doc.data()} as ListItem)
    });
    return listItems
}


async function addListItem(item: NewListItem): Promise<ListItem> {
    const itemDocRef = await listItemsRef.add(item)
    const addedItem = {
        ...item,
        id: itemDocRef.id,
    }
    return addedItem
}

async function removeListItem(itemId: string) {
    await listItemsRef.doc(itemId).delete()
}

const db = {
    getAllLists,
    addList,
    removeList,
    getList,
    getListItems,
    addListItem,
    removeListItem,
}

export default db
