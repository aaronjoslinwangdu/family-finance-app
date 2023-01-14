import AddExpense from "./AddExpense";
import ExpenseItem from "./ExpenseItem";
import classes from "./ExpenseSublist.module.css";

const ExpenseSublist = (props) => {
  return (
    <div className={classes.sublist}>
      <div className={classes.sublistHeader}>
        <header>{props.date}</header>
        <AddExpense date={props.date} />
      </div>
      <div className={classes.expenseSublist}>
        {props.expenses.map(expense => (
          <ExpenseItem 
            key={expense._id} 
            expense={expense}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseSublist;