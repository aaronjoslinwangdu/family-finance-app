import { Fragment} from "react";
import { useDispatch, useSelector } from 'react-redux';

import ExpenseList from "../components/Expenses/ExpenseList";
import ExpenseForm from "../components/Expenses/ExpenseForm";
import { expensesActions } from "../store/expenses-slice";

const ExpensePage = (props) => {
  const dispatch = useDispatch();
  const showExpenseForm = useSelector(state => state.expenses.showExpenseForm);

  const hideExpenseFormHandler = () => {
    dispatch(expensesActions.setShowExpenseForm(false));
  }

  return (
    <Fragment>
      <div>Expense Page</div>
      <div onClick={hideExpenseFormHandler}>Click me to hide</div>
      {showExpenseForm && <ExpenseForm />}
      <ExpenseList />
    </Fragment>
  );
};

export default ExpensePage;