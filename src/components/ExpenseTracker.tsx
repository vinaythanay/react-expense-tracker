
import { useState } from 'react';
import { useExpenses } from '@/hooks/use-expenses';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import ExpenseSummaryComponent from './ExpenseSummary';

const ExpenseTracker = () => {
  const {
    expenses,
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
    setSortDirection
  } = useExpenses();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-purple-600">Expense Tracker</h1>
        <p className="text-muted-foreground">Keep track of your daily expenses</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="space-y-6">
            <ExpenseForm onSubmit={addExpense} />
            <ExpenseSummaryComponent summary={summary} />
          </div>
        </div>
        <div className="lg:col-span-2">
          <ExpenseList
            expenses={expenses}
            onUpdate={updateExpense}
            onDelete={deleteExpense}
            categoryFilter={categoryFilter}
            onCategoryFilterChange={setCategoryFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortByChange={setSortBy}
            sortDirection={sortDirection}
            onSortDirectionChange={setSortDirection}
          />
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
