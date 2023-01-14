import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { expensesActions } from '../../store/expenses-slice';

const ExpenseForm = (props) => {
  const dispatch = useDispatch();
  const isEditing = useSelector(state => state.expenses.isEditing);
  const currentExpense = useSelector(state => state.expenses.currentExpense);

  const titleInputRef = useRef();
  const amountInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();
  const dateInputRef = useRef();


  if (isEditing) {
    console.log(currentExpense);
  }

  const titleDefault = isEditing ? currentExpense.title : '';
  const amountDefault = isEditing ? currentExpense.amount : '';
  const descriptionDefault = isEditing ? currentExpense.description : '';
  const categoryDefault = isEditing ? currentExpense.category : '';
  const dateDefault = isEditing ? currentExpense.date.slice(0,10) : '';

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
    })
    .catch((error) => {
      alert(error.message);
    });
  }

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor='title'>Title</label>
        <input type='text' id='title' defaultValue={titleDefault} required ref={titleInputRef}></input>
      </div>
      <div>
        <label htmlFor='amount'>Amount</label>
        <input type='number' id='amount' defaultValue={amountDefault} required ref={amountInputRef}></input>
      </div>
      <div>
        <label htmlFor='description'>Description</label>
        <input type='text' id='description' defaultValue={descriptionDefault} ref={descriptionInputRef}></input>
      </div>
      <div>
        <label htmlFor='category'>Category</label>
        <input type='text' id='category' defaultValue={categoryDefault} ref={categoryInputRef}></input>
      </div>
      <div>
        <label htmlFor='date'>Date</label>
        <input type='date' id='date' defaultValue={dateDefault} required ref={dateInputRef}></input>
      </div>
      <button>{isEditing ? 'Save' : 'Create'}</button>
    </form>
  );
};

export default ExpenseForm;