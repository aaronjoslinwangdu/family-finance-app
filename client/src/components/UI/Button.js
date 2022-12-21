import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './Button.module.css';
import { expensesActions } from '../../store/expenses-slice';


const DUMMY_EXPENSE = {
  id: 34,
  title: 'test',
  amount: 12.23,
  date: '12-22-2022'
}

const Button = (props) => {
  const dispatch = useDispatch();
  const isNewExpense = useSelector(state => state.expenses.isNewExpense);
  const currentExpense = useSelector(state => state.expenses.currentExpense);

  const closeExpenseHandler = (event) => {
    event.preventDefault();
    dispatch(expensesActions.setShowExpenseForm(false));
    dispatch(expensesActions.setIsEditing(false));
  }

  const saveAndCloseExpenseHandler = (event) => {
    event.preventDefault();
    isNewExpense ? dispatch(expensesActions.addExpense(currentExpense)) : dispatch(expensesActions.updateExpense(currentExpense))
    dispatch(expensesActions.setShowExpenseForm(false));
    dispatch(expensesActions.setIsEditing(false));
  }

  const editExpenseHandler = () => {
    dispatch(expensesActions.setIsEditing(true));
    dispatch(expensesActions.setIsNewExpense(false));
  }

  const removeExpenseHandler = (id) => {
    dispatch(expensesActions.removeExpense(currentExpense.id));
    dispatch(expensesActions.setCurrentExpense({ id: null, title: '', amount: null, date: '' }));
    dispatch(expensesActions.setShowExpenseForm(false));
    dispatch(expensesActions.setIsEditing(false));
  }

  let onClick;
  let buttonClasses;
  switch(props.type) {
    default:
    case 'close-expense':
      onClick = closeExpenseHandler;
      buttonClasses = `${classes.button} ${classes.default}`;
      break;
    case 'save-and-close-expense':
      onClick = saveAndCloseExpenseHandler;
      buttonClasses = `${classes.button} ${classes.save}`;
      break;
    case 'edit-expense':
      onClick = editExpenseHandler;
      buttonClasses = `${classes.button} ${classes.edit}`;
      break;
    case 'remove-expense':
      onClick = removeExpenseHandler;
      buttonClasses = `${classes.button} ${classes.remove}`;
      break;
  }

  return (
    <button className={buttonClasses} onClick={onClick} >{props.label}</button>
  );
};

export default Button;