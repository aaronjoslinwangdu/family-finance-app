import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import ExpenseList from "../components/Expenses/ExpenseList";
import ExpenseForm from "../components/Expenses/ExpenseForm";
import Modal from "../components/UI/Modal";

import { expensesActions } from "../store/expenses-slice";

const compareDates = (a, b) => {
  if (a.date < b.date) {
    return -1;
  }
  if (b.date < a.date) {
    return 1;
  }
  return 0;
}

const ExpensePage = (props) => {
  const dispatch = useDispatch();
  const showExpenseForm = useSelector(state => state.expenses.showExpenseForm);

  useEffect(() => {

    // declare async data fetch
    const fetchExpenses = async () => {
      
      // fetch data
      const data = await fetch('http://localhost:5000/api/expenses');
      
      // convert data
      const json = await data.json();
      
      // sort by date
      json.sort(compareDates);

      // set expenseList to data
      dispatch(expensesActions.setExpenseList(json));
    }

    try {
      fetchExpenses();
    } catch (err) {
      console.error(err);
    }

  }, [dispatch]);

  const expenseForm = (
    <Modal>
      <ExpenseForm />
    </Modal>
  );

  return (
    <Fragment>
      {showExpenseForm && expenseForm}
      <ExpenseList />
    </Fragment>
  );
};

export default ExpensePage;