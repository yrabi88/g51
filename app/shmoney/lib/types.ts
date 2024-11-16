export enum CurrencyId {
    ILS = 'ILS',
}

export type UtcIso = string;

export interface NewExpenseDto {
    userId: string;
    title: string;
    amount: number;
    currency: CurrencyId;
    paidAtIso: UtcIso;
}

export interface Expense extends NewExpenseDto {
    id: string;
}
