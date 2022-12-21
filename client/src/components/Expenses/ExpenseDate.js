import React from 'react';

import ItemCard from '../UI/ItemCard';
import classes from '../UI/ItemCard.module.css';

const ExpenseDate = (props) => {
  return (
    <ItemCard type={'date'}>
      <div className={classes.secondary}>Monday</div>
      <div className={classes.primary}>11/22/33</div>
    </ItemCard>
  );
};

export default ExpenseDate;