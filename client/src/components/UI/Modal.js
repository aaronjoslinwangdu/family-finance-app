import React from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';

import classes from './Modal.module.css';
import { expensesActions } from '../../store/expenses-slice';

const Modal = (props) => {
  const dispatch = useDispatch();

  const hideExpenseFormHandler = () => {
    dispatch(expensesActions.setShowExpenseForm(false));
    dispatch(expensesActions.setIsEditing(false));
    dispatch(expensesActions.setCurrentExpense());
  }

  const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={hideExpenseFormHandler}/>;
  };
  
  const ModalOverlay = (props) => {
    return (
      <div className={classes.modal}> 
        <div>{props.children}</div>
      </div>
    );
  };

  const portalElement = document.getElementById('overlays');

  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </React.Fragment>
  );
};

export default Modal;