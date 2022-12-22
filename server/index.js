const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use('/api/expenses', require('./routes/ExpenseRoutes'));

app.listen(port, () => console.log(`Listening on port ${port}`));
