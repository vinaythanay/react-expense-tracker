
import { useState, useEffect } from 'react';
import { Expense, ExpenseCategory, ExpenseSummary } from '@/types/expense';
import { toast } from '@/components/ui/sonner';

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [summary, setSummary] = useState<ExpenseSummary>({
    total: 0,
    categories: {
      Food: 0,
      Transport: 0,
      Entertainment: 0,
      Others: 0
    }
  });

  // Filters
  const [categoryFilter, setCategoryFilter] = useState<ExpenseCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Load expenses from localStorage
  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) {
      try {
        const parsedExpenses = JSON.parse(savedExpenses);
        setExpenses(parsedExpenses);
      } catch (error) {
        console.error('Failed to parse expenses from localStorage:', error);
        toast.error('Failed to load saved expenses');
      }
    }
  }, []);

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  // Calculate summary whenever expenses change
  useEffect(() => {
    const newSummary: ExpenseSummary = {
      total: 0,
      categories: {
        Food: 0,
        Transport: 0,
        Entertainment: 0,
        Others: 0
      }
    };

    expenses.forEach(expense => {
      newSummary.total += expense.amount;
      newSummary.categories[expense.category] += expense.amount;
    });

    setSummary(newSummary);
  }, [expenses]);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...expenses];

    // Apply category filter
    if (categoryFilter !== 'All') {
      result = result.filter(expense => expense.category === categoryFilter);
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(expense => 
        expense.title.toLowerCase().includes(query) || 
        expense.category.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === 'date') {
        return sortDirection === 'asc' 
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return sortDirection === 'asc'
          ? a.amount - b.amount
          : b.amount - a.amount;
      }
    });

    setFilteredExpenses(result);
  }, [expenses, categoryFilter, searchQuery, sortBy, sortDirection]);

  // Add a new expense
  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expense,
      id: crypto.randomUUID()
    };
    setExpenses(prev => [...prev, newExpense]);
    toast.success('Expense added successfully');
  };

  // Update an existing expense
  const updateExpense = (updatedExpense: Expense) => {
    setExpenses(prev => 
      prev.map(expense => 
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
    toast.success('Expense updated successfully');
  };

  // Delete an expense
  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
    toast.success('Expense deleted successfully');
  };

  return {
    expenses: filteredExpenses,
    summary,
    addExpense,
    updateExpense,
    deleteExpense,
    categoryFilter,
    setCategoryFilter,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
  };
}
