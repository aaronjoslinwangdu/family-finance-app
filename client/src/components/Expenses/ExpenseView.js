import React from 'react';
import { useSelector } from 'react-redux';

const ExpenseView = (props) => {
  const currentItem = useSelector(state => state.expenses.currentExpense);

  return (
    <React.Fragment>
      <div>{currentItem.title}</div>
      <div>{currentItem.amount}</div>
      <div>{currentItem.date}</div>
    </React.Fragment>
  );
};

export default ExpenseView;