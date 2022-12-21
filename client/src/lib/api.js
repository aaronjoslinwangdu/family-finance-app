const TEMP_DOMAIN = 'https://family-finance-a7e38-default-rtdb.firebaseio.com';

export const getAllExpenses = async () => {
  const response = await fetch(`${TEMP_DOMAIN}/expenses.json`);
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error('Error fetching all expenses');
  }

  const expenseData = [];
  for (const key in responseData) {
    const expenseObj = {
      id: key,
      ...responseData[key],
    }
    expenseData.push(expenseObj);
  }

  return expenseData;
}


export const getExpenseById = async (expenseId) => {
  const response = await fetch(`${TEMP_DOMAIN}/expenses/${expenseId}.json`);
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(`Error fetching expense: ${expenseId}`);
  }

  const expenseObj = {
    id: expenseId,
    ...responseData,
  }

  return expenseObj;
}


export const addExpense = async (expenseData) => {
  const response = await fetch(`${TEMP_DOMAIN}/expenses.json`, {
    method: 'POST',
    body: JSON.stringify(expenseData),
    headers: { 'Content-Type': 'application/json' }
  });
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error('Error creating expense');
  }

  return null;
}