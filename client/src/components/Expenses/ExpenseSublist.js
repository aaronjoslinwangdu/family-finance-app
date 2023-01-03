import AddExpense from "./AddExpense";
import ExpenseItem from "./ExpenseItem";
import classes from "./ExpenseSublist.module.css";

const ExpenseSublist = (props) => {
  return (
    <div className={classes.sublist}>
      <div className={classes.sublistHeader}>
        <header>{props.date}</header>
        <AddExpense />
      </div>
      <div className={classes.expenseSublist}>
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