import AddExpense from "./AddExpense";
import ExpenseItem from "./ExpenseItem";

const ExpenseSublist = (props) => {
  return (
    <div>
      <header>{props.date}</header>
      <AddExpense />
      <div>
        {props.expenses.map(expense => (
          <ExpenseItem 
            key={expense.id} 
            title={expense.title}
            amount={expense.amount}
            description={expense.description}
            category={expense.category}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseSublist;