export interface List {
    id: string
    name: string
}

export type NewListItem = Record<string, unknown> & {
    list_id: string
}

export type ListItem = NewListItem & {
    id: string
}
