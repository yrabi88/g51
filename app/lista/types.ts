import { UUID } from 'crypto'

export interface List {
    id: UUID
    name: string
    items: ListItem[]
}

export interface ListItem {
    id: UUID
    title: string
}
