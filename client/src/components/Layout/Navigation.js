import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import AddExpense from '../Expenses/AddExpense';
import DeleteExpense from '../Expenses/DeleteExpense';
import SelectExpenses from '../Expenses/SelectExpenses';

import classes from './Navigation.module.css';

const Navigation = (props) => {
  const isSelecting = useSelector(state => state.expenses.isSelecting);
  const token = useSelector(state => state.auth.token);



  return (
    <div className={classes.navigation}>
      <nav>
        <ul>
          <li><AddExpense /></li>
          <li><SelectExpenses /></li>
          {isSelecting && 
          <li><DeleteExpense /></li> 
          }
        </ul>
        <ul>
          <li>
            <NavLink to='/expenses'>Expenses</NavLink>
          </li>
          <li>
            <NavLink to='/groups'>Groups</NavLink>
          </li>
          <li>
            <NavLink to='/users/profile'>Profile</NavLink>
          </li>
          {token !== null &&
          <li>
            <NavLink to='/auth/'>Logout</NavLink>
          </li>
          }
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;