import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { expensesActions } from '../../store/expenses-slice';

import ExpenseSublist from './ExpenseSublist';

const ExpenseList = (props) => {
  // const dispatch = useDispatch();
  //const props.expenses = useSelector(state => state.expenses.expenseList);
  const [expenseSublists, setExpenseSublists] = useState([]);
  const [expenseDates, setExpenseDates] = useState([]);


  // need to make list update when new expense is added

  // useEffect(() => { 
  //   fetch('http://localhost:5000/api/expenses')
  //   .then((response) => {
  //     if (!response.ok) {
  //       return response.json()
  //         .then((data) => {
  //           let errorMessage = 'Error fetching expenses';
  //           throw new Error(errorMessage);
  //         });
  //     } else {
  //       return response.json();
  //     }
  //   })
  //   .then((data) => {
  //     dispatch(expensesActions.setprops.expenses(data));
  //     // create object with date keys containing arrays of expense corresponding expense objects
  //     let expensesByDay = {};
  //     expensesByDay[data[0].date.slice(0,10)] = [data[0]];
    
  //     for (let i = 1; i < data.length; i++) {
  //       const expenseDate = data[i].date.slice(0,10);
  //       if (!expensesByDay[expenseDate]) {
  //         expensesByDay[expenseDate] = [data[i]];
  //       } else {
  //         expensesByDay[expenseDate].push(data[i]);
  //       }
  //     }

  //     let expenseSublistsArr = [];
  //     let expenseDatesArr = [];
  //     for (const [date, props.expenses] of Object.entries(expensesByDay)) {
  //       expenseSublistsArr = [...expenseSublistsArr, props.expenses];
  //       expenseDatesArr = [...expenseDatesArr, date];
  //     }

  //     setExpenseDates(expenseDatesArr);
  //     setExpenseSublists(expenseSublistsArr);

  //   })
  //   .catch((error) => {
  //     alert(error.message);
  //   });
  // }, []);

  // let expenseSublistsArray = [];
  // for (let i = 0; i < expenseDates.length; i++) {
  //   expenseSublistsArray = [...expenseSublistsArray, 
  //     <ExpenseSublist key={i} expenses={expenseSublists[i]} date={expenseDates[i]}/>
  //   ];
  // }

  // return (
  //   <div>
  //     {expenseSublistsArray}
  //   </div>
  // );


  // create object with date keys containing arrays of expense corresponding expense objects
  // let expensesByDay = {};
  // expensesByDay[props.expenses[0].date.slice(0,10)] = [props.expenses[0]];

  // for (let i = 1; i < props.expenses.length; i++) {
  //   const expenseDate = props.expenses[i].date.slice(0,10);
  //   if (!expensesByDay[expenseDate]) {
  //     expensesByDay[expenseDate] = [props.expenses[i]];
  //   } else {
  //     expensesByDay[expenseDate].push(props.expenses[i]);
  //   }
  // }

  // let expenseSublistsArr = [];
  // let expenseDatesArr = [];
  // for (const [date, list] of Object.entries(expensesByDay)) {
  //   expenseSublistsArr = [...expenseSublistsArr, list];
  //   expenseDatesArr = [...expenseDatesArr, date];
  // }

  // setExpenseDates(expenseDatesArr);
  // setExpenseSublists(expenseSublistsArr);

  return (
    <div>
      asdf
    </div>
  );
};

export default ExpenseList;