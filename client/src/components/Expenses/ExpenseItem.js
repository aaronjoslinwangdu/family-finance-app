import React from "react";

const ExpenseItem = (props) => {

  //const amount = `$${props.amount.toFixed(2)}`

  return (
    <div>
      <div>{`Title: ${props.title}`}</div>
      <div>{`Category: ${props.category}`}</div>
      <div>{`Amount: $${props.amount}`}</div>
    </div>
  );
}

export default ExpenseItem;