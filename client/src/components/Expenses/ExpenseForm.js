import { useRef } from 'react';
import { useSelector } from 'react-redux';

const ExpenseForm = (props) => {
  const isEditing = useSelector(state => state.expenses.isEditing);

  const titleInputRef = useRef();
  const amountInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();
  const dateInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const addIdHere = 'add id for editing existing expense here';
    let url;
    if (isEditing) {
      // set url for logging in
      url = `http://localhost:5000/api/expenses/${addIdHere}`;
    } else {
      // set url for creating new expense
      url = 'http://localhost:5000/api/expenses';

      const enteredTitle = titleInputRef.current.value;
      const enteredAmount = amountInputRef.current.value;
      const enteredDescription = descriptionInputRef.current.value;
      const enteredCategory = categoryInputRef.current.value;
      const enteredDate = dateInputRef.current.value;

      fetch(url, {
        method: 'POST',
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
              let errorMessage = 'Error adding expense';
              throw new Error(errorMessage);
            });
          } else {
            return response.json();
          }
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor='title'>Title</label>
        <input type='text' id='title' required ref={titleInputRef}></input>
      </div>
      <div>
        <label htmlFor='amount'>Amount</label>
        <input type='number' id='amount' required ref={amountInputRef}></input>
      </div>
      <div>
        <label htmlFor='description'>Description</label>
        <input type='text' id='description' ref={descriptionInputRef}></input>
      </div>
      <div>
        <label htmlFor='category'>Category</label>
        <input type='checkbox' id='category' ref={categoryInputRef}></input>
      </div>
      <div>
        <label htmlFor='date'>Date</label>
        <input type='date' id='date' required ref={dateInputRef}></input>
      </div>
      <button>{isEditing ? 'Save' : 'Create'}</button>
    </form>
  );
};

export default ExpenseForm;