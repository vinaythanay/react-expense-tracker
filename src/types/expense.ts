
export type ExpenseCategory = 'Food' | 'Transport' | 'Entertainment' | 'Others';

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
}

export interface ExpenseSummary {
  total: number;
  categories: {
    [key in ExpenseCategory]: number;
  };
}
