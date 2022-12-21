import { Fragment} from "react";
import ExpenseList from "../components/Expenses/ExpenseList";

const ExpensePage = (props) => {
  

  return (
    <Fragment>
      <div>Expense Page</div>
      <ExpenseList />
    </Fragment>
  );
};

export default ExpensePage;