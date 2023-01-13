import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import ExpenseSublist from './ExpenseSublist';

const ExpenseList = (props) => {
  const expenseList = useSelector(state => state.expenses.expenseList);

  let expenseSublistsArray = [];
  if (expenseList.length > 0) {

    let expensesByDay = {};
    expensesByDay[expenseList[0].date.slice(0,10)] = [expenseList[0]];

    for (let i = 1; i < expenseList.length; i++) {
      const expenseDate = expenseList[i].date.slice(0,10);
      if (!expensesByDay[expenseDate]) {
        expensesByDay[expenseDate] = [expenseList[i]];
      } else {
        expensesByDay[expenseDate].push(expenseList[i]);
      }
    }

    // let expensesByDay = {};
    // const firstExpense = expenseList[Object.keys(expenseList)[0]];
    // expensesByDay[firstExpense.date.slice(0,10)] = [firstExpense];

    // for (const [id, expense] of Object.entries(expenseList)) {
    //   const expenseDate = expense.date.slice(0,10);
    //   if (!expensesByDay[expenseDate]) {
    //     expensesByDay[expenseDate] = [expense];
    //   } else {
    //     expensesByDay[expenseDate].push(expense);
    //   }
    // }

    let expenseSublistsArr = [];
    let expenseDatesArr = [];
    for (const [date, list] of Object.entries(expensesByDay)) {
      expenseSublistsArr = [...expenseSublistsArr, list];
      expenseDatesArr = [...expenseDatesArr, date];
    }

    for (let i = 0; i < expenseDatesArr.length; i++) {
      expenseSublistsArray = [...expenseSublistsArray, 
        <ExpenseSublist key={i} expenses={expenseSublistsArr[i]} date={expenseDatesArr[i]}/>
      ];
    }
  }

  console.log(expenseList);

  return (
    <div>
      {expenseList.length > 0 && expenseSublistsArray}
    </div>
  );
};

export default ExpenseList;