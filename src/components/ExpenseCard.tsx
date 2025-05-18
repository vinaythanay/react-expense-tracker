
import { useState } from 'react';
import { Expense } from '@/types/expense';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ExpenseForm from './ExpenseForm';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Edit, Trash2 } from 'lucide-react';

interface ExpenseCardProps {
  expense: Expense;
  onUpdate: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

const ExpenseCard = ({ expense, onUpdate, onDelete }: ExpenseCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Get category color based on the expense category
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Food':
        return 'bg-expense-food';
      case 'Transport':
        return 'bg-expense-transport';
      case 'Entertainment':
        return 'bg-expense-entertainment';
      default:
        return 'bg-expense-others';
    }
  };

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  if (isEditing) {
    return (
      <div className="expense-card">
        <ExpenseForm
          expenseToEdit={expense}
          onSubmit={(updatedExpense) => {
            onUpdate({ ...updatedExpense, id: expense.id });
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <Card className="expense-card overflow-hidden">
      <div className={`h-2 ${getCategoryColor(expense.category)}`} />
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{expense.title}</h3>
            <div className="text-sm opacity-70">{formatDate(expense.date)}</div>
            <span className="inline-block px-2 py-1 mt-1 text-xs rounded-full bg-muted">
              {expense.category}
            </span>
          </div>
          <div className="text-lg font-bold">
            ${expense.amount.toFixed(2)}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 p-2">
        <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
          <Edit className="h-4 w-4" />
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Expense</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this expense? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-destructive text-destructive-foreground" onClick={() => onDelete(expense.id)}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default ExpenseCard;
