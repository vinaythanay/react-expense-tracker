
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExpenseSummary as ExpenseSummaryType } from '@/types/expense';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

interface ExpenseSummaryProps {
  summary: ExpenseSummaryType;
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Food':
      return '#0EA5E9';
    case 'Transport':
      return '#F97316';
    case 'Entertainment':
      return '#D946EF';
    default:
      return '#8B5CF6';
  }
};

const ExpenseSummaryComponent = ({ summary }: ExpenseSummaryProps) => {
  const pieChartData = Object.entries(summary.categories).map(([name, value]) => ({
    name,
    value,
    color: getCategoryColor(name)
  })).filter(item => item.value > 0);

  const barChartData = [...pieChartData];

  // Get current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-purple-600">
          Expense Summary - {currentMonth} {currentYear}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
          <p className="text-sm text-muted-foreground">Total Spent</p>
          <p className="text-4xl font-bold">${summary.total.toFixed(2)}</p>
        </div>
        
        <div className="space-y-6">
          {/* Category breakdown */}
          <div>
            <h3 className="font-medium mb-2">Category Breakdown</h3>
            <div className="space-y-2">
              {Object.entries(summary.categories).map(([category, amount]) => (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: getCategoryColor(category) }}
                    />
                    <span>{category}</span>
                  </div>
                  <div className="font-medium">
                    ${amount.toFixed(2)} 
                    <span className="text-xs text-muted-foreground ml-1">
                      ({summary.total > 0 ? ((amount / summary.total) * 100).toFixed(0) : 0}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Visualization */}
          {summary.total > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-64">
                <h3 className="font-medium mb-2 text-center">Distribution</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="h-64">
                <h3 className="font-medium mb-2 text-center">By Category</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={barChartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                    <Bar dataKey="value">
                      {barChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseSummaryComponent;
