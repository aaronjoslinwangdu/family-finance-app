import { useSelector, useDispatch } from "react-redux";

import { expensesActions } from "../../store/expenses-slice";

import classes from "./SelectExpenses.module.css";

const SelectExpenses = () => {
  const dispatch = useDispatch();
  const isSelecting = useSelector(state => state.expenses.isSelecting);

  const selectHandler = () => {
    dispatch(expensesActions.setIsSelecting(!isSelecting));
    if (!isSelecting) {
      dispatch(expensesActions.clearSelectedExpenses());
    }
  }

  return (
    <div className={classes.selectExpenses} onClick={selectHandler}>
      {isSelecting ? 'Selecting' : 'Select'}
    </div>
  )
}

export default SelectExpenses;