import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import DeleteExpense from './DeleteExpense';

import { expensesActions } from '../../store/expenses-slice';
import classes from './ExpenseForm.module.css';

const ExpenseForm = (props) => {
  const dispatch = useDispatch();
  const isEditing = useSelector(state => state.expenses.isEditing);
  // const currentExpense = useSelector(state => state.expenses.currentExpense);
  const selectedExpenses = useSelector(state => state.expenses.selectedExpenses);

  const titleInputRef = useRef();
  const amountInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();
  const dateInputRef = useRef();

  // const titleDefault = isEditing ? currentExpense.title : '';
  // const amountDefault = isEditing ? currentExpense.amount : '';
  // const descriptionDefault = isEditing ? currentExpense.description : '';
  // const categoryDefault = isEditing ? currentExpense.category : '';
  // const dateDefault = isEditing ? currentExpense.date.slice(0,10) : '';

  let currentExpense = {}
  let titleDefault = '';
  let amountDefault = '';
  let descriptionDefault = '';
  let categoryDefault = '';
  let dateDefault = '';

  if (selectedExpenses.length === 1 && selectedExpenses[0]) {
    currentExpense = selectedExpenses[0];
    titleDefault = currentExpense.title;
    amountDefault = currentExpense.amount;
    descriptionDefault = currentExpense.description;
    categoryDefault = currentExpense.category;
    dateDefault = currentExpense.date.slice(0,10);
  }


  const submitHandler = (event) => {
    event.preventDefault();
    const enteredTitle = titleInputRef.current.value;
    const enteredAmount = amountInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredCategory = categoryInputRef.current.value;
    const enteredDate = dateInputRef.current.value;
    
    let url;
    let method;
    if (isEditing) {

      // check if expense actually changed
      if (
        enteredTitle === currentExpense.title &&
        enteredAmount === currentExpense.amount &&
        enteredDescription === currentExpense.description &&
        enteredCategory === currentExpense.category &&
        enteredDate === currentExpense.date.slice(0,10)
      ) { 
        dispatch(expensesActions.setIsEditing(false));
        dispatch(expensesActions.setShowExpenseForm(false));
        return;
      }

      url = `http://localhost:5000/api/expenses/${currentExpense._id}`;
      method = 'PUT';
    } else {
      url = 'http://localhost:5000/api/expenses';
      method = 'POST';
    }

    // add or update expense
    fetch(url, {
      method: method,
      body: JSON.stringify({
        title: enteredTitle,
        amount: enteredAmount,
        description: enteredDescription,
        category: enteredCategory,
        date: enteredDate,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          let errorMessage = `Error sending ${method} request.`;
          throw new Error(errorMessage);
        });
      } else {
        return response.json();
      }
    })
    .then((data) => {

      if (isEditing) {
        dispatch(expensesActions.updateExpense(data));
      } else {
        dispatch(expensesActions.addExpense(data));
      }

      dispatch(expensesActions.setIsEditing(false));
      dispatch(expensesActions.setShowExpenseForm(false));
      dispatch(expensesActions.clearSelectedExpenses());
    })
    .catch((error) => {
      alert(error.message);
    });
  }

  const cancelHandler = (event) => {
    event.preventDefault();
    dispatch(expensesActions.setShowExpenseForm(false));
    dispatch(expensesActions.clearSelectedExpenses());
  }

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.inputSection}>
        <div className={classes.inputSubsection}>
          <label htmlFor='title'>Title</label>
          <input type='text' id='title' defaultValue={titleDefault} required ref={titleInputRef}></input>
        </div>
        <div className={classes.inputSubsection}>
          <label htmlFor='amount'>Amount</label>
          <input type='number' id='amount' min="0.00" step="0.01" defaultValue={amountDefault} required ref={amountInputRef}></input>
        </div>
        <div className={classes.inputSubsection}>
          <label htmlFor='description'>Description</label>
          <input type='text' id='description' defaultValue={descriptionDefault} ref={descriptionInputRef}></input>
        </div>
        <div className={classes.inputSubsection}>
          <label htmlFor='category'>Category</label>
          <input type='text' id='category' defaultValue={categoryDefault} ref={categoryInputRef}></input>
        </div>
        <div className={classes.inputSubsection}>
          <label htmlFor='date'>Date</label>
          <input type='date' id='date' defaultValue={dateDefault} required ref={dateInputRef}></input>
        </div>
      </div>
      <div className={classes.buttonSection}>
        <button type="submit">{isEditing ? 'Save' : 'Create'}</button>
        <button onClick={cancelHandler}>Cancel</button>
        {isEditing && <DeleteExpense />}
      </div>
    </form>
  );
};

export default ExpenseForm;