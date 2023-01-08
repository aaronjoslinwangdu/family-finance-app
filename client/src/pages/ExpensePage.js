import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import ExpenseList from "../components/Expenses/ExpenseList";
import ExpenseForm from "../components/Expenses/ExpenseForm";


import { expensesActions } from "../store/expenses-slice";

const ExpensePage = (props) => {
  const dispatch = useDispatch();
  const showExpenseForm = useSelector(state => state.expenses.showExpenseForm);
  const expenseList = useSelector(state => state.expenses.expenseList);

  const hideExpenseFormHandler = () => {
    dispatch(expensesActions.setShowExpenseForm(false));
  }

  const showExpenseFormHandler = () => {
    dispatch(expensesActions.setShowExpenseForm(true));
  }

  useEffect(() => {
    // declare async data fetch
    const fetchExpenses = async () => {
      // fetch data
      const data = await fetch('http://localhost:5000/api/expenses');
      // convert data
      const json = await data.json();
      // set expenseList to data
      dispatch(expensesActions.setExpenseList(json));
    }

    try {
      fetchExpenses();
    } catch (err) {
      console.error(err);
    }

  }, [dispatch]);


  // console.log(expenseList);

  return (
    <Fragment>
      <div onClick={hideExpenseFormHandler}>Click me to hide form</div>
      <div onClick={showExpenseFormHandler}>Click me to show form</div>
      {showExpenseForm && <ExpenseForm />}
      <ExpenseList expenses={expenseList}/>
    </Fragment>
  );
};

export default ExpensePage;