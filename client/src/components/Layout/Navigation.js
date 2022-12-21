import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Navigation.module.css';

const Navigation = (props) => {

  return (
    <div className={classes.navigation}>
      <nav>
        <ul>
          <li>
            <NavLink to='/expenses'>Expenses</NavLink>
          </li>
          <li>
          <NavLink to='/groups'>Groups</NavLink>
          </li>
          <li>
          <NavLink to='/profile'>Profile</NavLink>
          </li>
          <li>
          <NavLink to='/login'>Login</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;