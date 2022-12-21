import AddExpense from "./AddExpense";
import ExpenseItem from "./ExpenseItem";

const ExpenseSublist = (props) => {
  return (
    <div>
      <header>Date: 12/12/22</header>
      <AddExpense />
      <ul>
        <li>
          <ExpenseItem title='Item 1' category='Dining' amount='35.23'/>
        </li>
        <li>
          <ExpenseItem title='Item 2' category='Grocery' amount='89.32'/>
        </li>
        <li>
          <ExpenseItem title='Item 3' category='Entertainment' amount='29.99'/>
        </li>
      </ul>
    </div>
  );
};

export default ExpenseSublist;