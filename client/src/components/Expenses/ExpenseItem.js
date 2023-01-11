import React from "react";
import { useDispatch } from 'react-redux';

import { expensesActions } from '../../store/expenses-slice';
import classes from "./ExpenseItem.module.css";

const ExpenseItem = (props) => {
  const dispatch = useDispatch();
  const amount = `$${props.expense.amount.toFixed(2)}`;

  const editExpenseHandler = () => {
    dispatch(expensesActions.setShowExpenseForm(true));
    dispatch(expensesActions.setIsEditing(true));
    dispatch(expensesActions.setCurrentExpense(props.expense));
  }

  return (
    <div className={classes.expenseItem} onClick={editExpenseHandler}>
      <div>{props.expense.title}</div>
      <div>{amount}</div>
    </div>
  );
}

export default ExpenseItem;