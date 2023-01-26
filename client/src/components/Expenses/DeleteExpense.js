import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { expensesActions } from '../../store/expenses-slice';

const DeleteExpense = (props) => {
  const dispatch = useDispatch();
  const selectedExpenses = useSelector(state => state.expenses.selectedExpenses);
  const isEditing = useSelector(state => state.expenses.isEditing);

  // functionality for deleting expenses should be in here
  const deleteSelectedExpensesHandler = () => {
    
    for (let i = 0; i < selectedExpenses.length; i++) {
      fetch(`http://localhost:5000/api/expenses/${selectedExpenses[i]._id}`, {
        method: 'DELETE',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
        }
      })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            let errorMessage = `Error deleting Expense: ${selectedExpenses[i]._id}`;
            throw new Error(errorMessage);
          });
        } else {
          return response.json();
        }
      })
      .then((data) => {
        dispatch(expensesActions.removeSelectedExpense(data));
        dispatch(expensesActions.deleteExpense(data));
      })
      .catch((error) => {
        alert(error.message);
      });
    }

    if (isEditing) {
      dispatch(expensesActions.setIsEditing(false));
      dispatch(expensesActions.setShowExpenseForm(false));
    }

    dispatch(expensesActions.setIsSelecting(false));
    dispatch(expensesActions.clearSelectedExpenses());

  }

  // TODO: STYLE THIS BUTTON AND FORM

  return (
    <button onClick={deleteSelectedExpensesHandler}>
      Delete
    </button>
  );
};

export default DeleteExpense;