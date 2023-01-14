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
    console.log(props.date);
    dispatch(expensesActions.setCurrentExpense(currentExpenseWithDate));
    dispatch(expensesActions.setShowExpenseForm(true));
    dispatch(expensesActions.setIsEditing(false))
  }

  return (
    <div>
      <div className={classes.addExpense} onClick={addExpenseHandler}>Add</div>
    </div>
  );
};

export default AddExpense;