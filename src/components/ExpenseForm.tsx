
import { useState } from 'react';
import { Expense, ExpenseCategory } from '@/types/expense';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/sonner';

interface ExpenseFormProps {
  onSubmit: (expense: Omit<Expense, 'id'>) => void;
  expenseToEdit?: Expense;
  onCancel?: () => void;
}

const CATEGORIES: ExpenseCategory[] = ['Food', 'Transport', 'Entertainment', 'Others'];

const ExpenseForm = ({ onSubmit, expenseToEdit, onCancel }: ExpenseFormProps) => {
  const [title, setTitle] = useState(expenseToEdit?.title || '');
  const [amount, setAmount] = useState(expenseToEdit?.amount.toString() || '');
  const [category, setCategory] = useState<ExpenseCategory>(expenseToEdit?.category || 'Others');
  const [date, setDate] = useState(expenseToEdit?.date || new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (!date) {
      toast.error('Please select a date');
      return;
    }

    onSubmit({
      title: title.trim(),
      amount: parsedAmount,
      category,
      date
    });

    // Reset form if not editing
    if (!expenseToEdit) {
      setTitle('');
      setAmount('');
      setCategory('Others');
      setDate(new Date().toISOString().split('T')[0]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-purple-600">
          {expenseToEdit ? 'Edit Expense' : 'Add New Expense'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What did you spend on?"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="How much did you spend?"
              min="0.01"
              step="0.01"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={(value) => setCategory(value as ExpenseCategory)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button type="submit" className="bg-primary">
              {expenseToEdit ? 'Update Expense' : 'Add Expense'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ExpenseForm;
