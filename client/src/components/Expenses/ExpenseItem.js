import React from "react";

import classes from "./ExpenseItem.module.css";

const ExpenseItem = (props) => {

  const amount = `$${props.amount.toFixed(2)}`;

  return (
    <div className={classes.expenseItem}>
      <div>{props.title}</div>
      <div>{amount}</div>
    </div>
  );
}

export default ExpenseItem;