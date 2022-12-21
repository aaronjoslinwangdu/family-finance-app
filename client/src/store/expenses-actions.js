import { expensesActions } from "./expenses-slice";

export const fetchExpensesData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch('https://family-finance-a7e38-default-rtdb.firebaseio.com/expenses.json');
      
      if (!response.ok) {
        throw new Error('Error fetching expenses');
      }

      const data = await response.json();

      return data;
    }

    try {
      const expensesData = await fetchData();
      dispatch(expensesActions.replaceExpenses(expensesData));
    } catch (error) {
      console.log(error);
    }
  
  }
}

export const sendExpensesData = (expenses) => {
  return async (dispatch) => {
    const sendData = async () => {
      const response = await fetch(
        'https://family-finance-a7e38-default-rtdb.firebaseio.com/expenses.json', 
        { method: 'PUT', body: JSON.stringify(expenses) }
      );

      if (!response.ok) {
        throw new Error('Sending expenses data failed')
      }
    }

    try {
      await sendData();
    } catch (error) {
      console.log(error);
    }
  }
}