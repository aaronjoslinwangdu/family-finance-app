import React from 'react';
import { useDispatch } from 'react-redux';

import  { expensesActions } from '../../store/expenses-slice';

const AddExpense = (props) => {
  const dispatch = useDispatch();

  const addExpenseHandler = () => {
    dispatch(expensesActions.setShowExpenseForm(true));
    dispatch(expensesActions.setIsEditing(false))
  }

  return (
    <div>
      <div onClick={addExpenseHandler}>Add Expense</div>
    </div>
  );
};

export default AddExpense;