import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { expensesActions } from '../../store/expenses-slice';
import classes from "./ExpenseItem.module.css";

const ExpenseItem = (props) => {
  const dispatch = useDispatch();
  const isSelecting = useSelector(state => state.expenses.isSelecting);
  const [isSelected, setIsSelected] = useState(false);
  const amount = `$${props.expense.amount.toFixed(2)}`;

  const clickExpenseHandler = () => {
    if (isSelecting) {
      if (!isSelected) {
        dispatch(expensesActions.addSelectedExpense(props.expense._id));
        setIsSelected(true);
      } else {
        dispatch(expensesActions.removeSelectedExpense(props.expense._id));
        setIsSelected(false);
      }
    } else {
      dispatch(expensesActions.setShowExpenseForm(true));
      dispatch(expensesActions.setIsEditing(true));
      dispatch(expensesActions.setCurrentExpense(props.expense));
    }
  }

  let expenseClasses;
  if (isSelecting && isSelected) {
    expenseClasses = `${classes.expenseItem} ${classes.selecting} ${classes.selected}`;
  } else if (isSelecting && !isSelected) {
    expenseClasses = `${classes.expenseItem} ${classes.selecting}`;
  } else if (!isSelecting && isSelected) {
    expenseClasses = `${classes.expenseItem} ${classes.selected}`;
  } else if (!isSelecting) {
    expenseClasses = `${classes.expenseItem}`;
  }

  return (
    <div className={expenseClasses} onClick={clickExpenseHandler}>
      <div>{props.expense.title}</div>
      <div>{amount}</div>
    </div>
  );
}

export default ExpenseItem;