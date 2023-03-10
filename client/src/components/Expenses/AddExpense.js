import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { expensesActions } from '../../store/expenses-slice';
import classes from "./AddExpense.module.css";

const AddExpense = (props) => {
  const dispatch = useDispatch();

  const addExpenseHandler = () => {
    const currentExpenseWithDate = {
      title: '',
      amount: '',
      description: '',
      category: '',
      date: props.date ? props.date : ''
    }

    dispatch(expensesActions.setIsSelecting(false));
    dispatch(expensesActions.addSelectedExpense(currentExpenseWithDate));
    dispatch(expensesActions.setShowExpenseForm(true));
    dispatch(expensesActions.setIsEditing(false))
  }

  return (
    <button className={classes.addExpense} onClick={addExpenseHandler}>Add</button>
  );
};

export default AddExpense;