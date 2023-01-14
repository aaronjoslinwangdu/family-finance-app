import AddExpense from "./AddExpense";
import ExpenseItem from "./ExpenseItem";
import classes from "./ExpenseSublist.module.css";

const ExpenseSublist = (props) => {

  const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
  let date = new Date(props.date);
  date = date.toLocaleDateString("en-US", options);

  return (
    <div className={classes.sublist}>
      <div className={classes.sublistHeader}>
        <header>{date}</header>
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