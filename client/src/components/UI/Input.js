import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { expensesActions } from "../../store/expenses-slice";

import classes from './Input.module.css';

const Input = (props) => {
  const dispatch = useDispatch();
  const currentLayout = useSelector(state => state.layout.currentLayout);
  const currentExpense = useSelector(state => state.expenses.currentExpense);

  const titleChangeHandler = (event) => {
    console.log(event.target.value);
    dispatch(expensesActions.setCurrentExpense({...currentExpense, title: event.target.value}));
  }

  const amountChangeHandler = (event) => {
    console.log(event.target.value);
    dispatch(expensesActions.setCurrentExpense({...currentExpense, amount: parseInt(event.target.value)}));
  }

  const dateChangeHandler = (event) => {
    console.log(event.target.value);
    dispatch(expensesActions.setCurrentExpense({...currentExpense, date: event.target.value}));
  }

  const dateFormatter = (date) => {
    const dateObj = new Date(date);
    return [
      dateObj.getFullYear(),
      dateObj.getMonth() + 1,
      dateObj.getDate().toString().padStart(2, '0')
    ].join('-');
  }

  const dateInput = (
    <div className={classes['input-section']}>
      <label htmlFor='date'>Date</label>
      <input 
        id='date'
        type='date' 
        value={currentExpense.date}
        onChange={dateChangeHandler}
      />
    </div>
  );


  
  return (
    <div className={classes.input}>
      <div className={classes['input-section']}>
        <label htmlFor='title'>Title</label>
        <input 
          id='title'
          type='text' 
          value={currentExpense.title}
          onChange={titleChangeHandler}
        />
      </div>
      <div className={classes['input-section']}>
        <label>Amount</label>
        <input 
          id='amount'
          type='numeric' 
          value={currentExpense.amount}
          onChange={amountChangeHandler}
        />
      </div>
      {currentLayout === 'day' && dateInput}
    </div>
  );
};

export default Input;