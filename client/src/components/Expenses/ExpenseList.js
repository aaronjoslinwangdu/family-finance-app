import React from 'react';

import ExpenseSublist from './ExpenseSublist';

const ExpenseList = (props) => {

  return (
    <div>
      <ExpenseSublist />
      <ExpenseSublist />
    </div>
  );
};

export default ExpenseList;