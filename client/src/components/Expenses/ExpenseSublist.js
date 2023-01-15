import AddExpense from "./AddExpense";
import ExpenseItem from "./ExpenseItem";
import classes from "./ExpenseSublist.module.css";

const ExpenseSublist = (props) => {

  let day = props.date.slice(8,10);
  if (day.length === 2 && day[0] === '0') {
    day = day[1];
  }
  let month = props.date.slice(5,7);
  if (month.length === 2 && month[0] === '0') {
    month = month[1];
  }
  const year = props.date.slice(0,4);
  const fullDate = month + '/' + day + '/' + year;

  return (
    <div className={classes.sublist}>
      <div className={classes.sublistHeader}>
        <header>{fullDate}</header>
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