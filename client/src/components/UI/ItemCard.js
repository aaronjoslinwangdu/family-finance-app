import React from 'react';

import classes from './ItemCard.module.css';
import { expensesActions } from '../../store/expenses-slice';
import { useDispatch } from 'react-redux';


const ItemCard = (props) => {
  const dispatch = useDispatch();

  const setShowHandler = () => {
    dispatch(expensesActions.setShowExpenseForm(true));
    dispatch(expensesActions.setCurrentExpense(props.item))
  }

  const setShowAndEditHandler = () => {
    dispatch(expensesActions.setIsEditing(true));
    dispatch(expensesActions.setCurrentExpense(props.item));
    dispatch(expensesActions.setShowExpenseForm(true));
    dispatch(expensesActions.setIsNewExpense(true));
  }

  let onClick;
  let cardClasses;
  if (props.type === 'add') {
    onClick = setShowAndEditHandler;
    cardClasses = `${classes.card} ${classes.add}`;
  } else if (props.type === 'expense') {
    onClick = setShowHandler;
    cardClasses = `${classes.card} ${classes.expense}`;
  }

  return (
    <div className={cardClasses} onClick={onClick}>
      {props.children}
    </div>
  );
}

export default ItemCard;