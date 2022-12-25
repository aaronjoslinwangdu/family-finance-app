import React from 'react';

import ExpenseSublist from './ExpenseSublist';

const ExpenseList = (props) => {

  fetch('http://localhost:5000/api/expenses')
  .then((response) => {
    if (!response.ok) {
      return response.json()
        .then((data) => {
          let errorMessage = 'Authentication Error';
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

  return (
    <div>
      <ExpenseSublist />
      <ExpenseSublist />
    </div>
  );
};

export default ExpenseList;