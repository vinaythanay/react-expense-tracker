
import { Expense, ExpenseCategory } from '@/types/expense';
import ExpenseCard from './ExpenseCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Filter, Search } from 'lucide-react';
import { useState } from 'react';

interface ExpenseListProps {
  expenses: Expense[];
  onUpdate: (expense: Expense) => void;
  onDelete: (id: string) => void;
  categoryFilter: string;
  onCategoryFilterChange: (category: ExpenseCategory | 'All') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: 'date' | 'amount';
  onSortByChange: (sort: 'date' | 'amount') => void;
  sortDirection: 'asc' | 'desc';
  onSortDirectionChange: (direction: 'asc' | 'desc') => void;
}

const ExpenseList = ({
  expenses,
  onUpdate,
  onDelete,
  categoryFilter,
  onCategoryFilterChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortByChange,
  sortDirection,
  onSortDirectionChange
}: ExpenseListProps) => {
  const [showFilters, setShowFilters] = useState(false);
  
  const categories: (ExpenseCategory | 'All')[] = ['All', 'Food', 'Transport', 'Entertainment', 'Others'];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">Your Expenses</h2>
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
          </Button>
        </div>
        
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search expenses..."
            className="pl-8 w-full sm:w-auto"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      {showFilters && (
        <div className="flex flex-col sm:flex-row gap-4 p-4 bg-muted/40 rounded-lg">
          <div className="space-y-1 flex-1">
            <Label htmlFor="category-filter">Category</Label>
            <Select value={categoryFilter} onValueChange={(v) => onCategoryFilterChange(v as ExpenseCategory | 'All')}>
              <SelectTrigger id="category-filter">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-1 flex-1">
            <Label htmlFor="sort-by">Sort By</Label>
            <Select value={sortBy} onValueChange={(v) => onSortByChange(v as 'date' | 'amount')}>
              <SelectTrigger id="sort-by">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="amount">Amount</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-1 flex-1">
            <Label htmlFor="sort-direction">Order</Label>
            <Select value={sortDirection} onValueChange={(v) => onSortDirectionChange(v as 'asc' | 'desc')}>
              <SelectTrigger id="sort-direction">
                <SelectValue placeholder="Sort direction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">{sortBy === 'date' ? 'Oldest First' : 'Lowest First'}</SelectItem>
                <SelectItem value="desc">{sortBy === 'date' ? 'Newest First' : 'Highest First'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {expenses.length === 0 ? (
        <div className="text-center py-8 bg-muted/40 rounded-lg">
          <p className="text-muted-foreground">No expenses found.</p>
          {categoryFilter !== 'All' || searchQuery ? (
            <p className="text-sm text-muted-foreground mt-1">Try changing your filters</p>
          ) : (
            <p className="text-sm text-muted-foreground mt-1">Add your first expense using the form above!</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {expenses.map(expense => (
            <ExpenseCard 
              key={expense.id} 
              expense={expense} 
              onUpdate={onUpdate} 
              onDelete={onDelete} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
