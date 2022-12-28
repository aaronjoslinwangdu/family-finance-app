import React from 'react';

import ExpenseSublist from './ExpenseSublist';

const ExpenseList = (props) => {


  let expenseSublists = [];
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
    // create object with date keys containing arrays of expense corresponding expense objects
    let expensesByDay = {};
    expensesByDay[data[0].date.slice(0,10)] = [data[0]];
  
    for (let i = 1; i < data.length; i++) {
      const expenseDate = data[i].date.slice(0,10);
      if (!expensesByDay[expenseDate]) {
        expensesByDay[expenseDate] = [data[i]];
      } else {
        expensesByDay[expenseDate].push(data[i]);
      }
    }

    console.log(expensesByDay);


    for (const [date, expenseList] of Object.entries(expensesByDay)) {
      // find why this isn't working
      expenseSublists.push(<ExpenseSublist expenses={expenseList} date={date}/>);
    }


  })
  .catch((error) => {
    alert(error.message);
  });

  console.log(expenseSublists);

  return (
    <div>
      {expenseSublists}
    </div>
  );
};

export default ExpenseList;