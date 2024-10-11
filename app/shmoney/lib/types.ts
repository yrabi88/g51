export enum CurrencyId {
    ILS = 'ILS',
}

export type UtcIso = string;

export interface Expense {
    id: string;
    ownerId: string;
    name: string;
    amount: number;
    currency: CurrencyId;
    date: UtcIso;
}
