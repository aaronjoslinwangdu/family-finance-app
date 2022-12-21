import React from 'react';
import { useSelector } from 'react-redux';

import Modal from '../UI/Modal';
import Input from '../UI/Input';
import ExpenseView from './ExpenseView';
import Button from '../UI/Button';

import classes from './ExpenseForm.module.css';

const ExpenseForm = (props) => {
  const isEditing = useSelector(state => state.expenses.isEditing);
  const isNewExpense = useSelector(state => state.expenses.isNewExpense);
  const showExpenseForm = useSelector(state => state.expenses.showExpenseForm);

  let buttons;
  if (showExpenseForm && !isEditing){
    buttons = (
      <div className={classes.buttons}>
        <Button type={'close-expense'} label={'Close'}/>
        <Button type={'edit-expense'} label={'Edit'}/>
      </div>
    );
  } else if (showExpenseForm && isEditing && isNewExpense) {
    buttons = (
      <div className={classes.buttons}>
        <Button type={'close-expense'} label={'Close'}/>
        <Button type={'save-and-close-expense'} label={'Create'}/>
      </div>
    );
  } else if (showExpenseForm && isEditing && !isNewExpense) {
    buttons = (
      <div className={classes.buttons}>
        <Button type={'close-expense'} label={'Close'}/>
        <Button type={'remove-expense'} label={'Delete'}/>
        <Button type={'save-and-close-expense'} label={'Save'}/>
      </div>
    );
  }


  return (
    <Modal>
      <div>
        {showExpenseForm && isEditing && <Input />}
        {showExpenseForm && !isEditing && <ExpenseView />}
      </div>
      {buttons}
    </Modal>
  );
};

export default ExpenseForm;