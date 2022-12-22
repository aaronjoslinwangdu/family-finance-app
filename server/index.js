const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const { errorHandler } = require('./middleware/ErrorMiddleware');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/expenses', require('./routes/ExpenseRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Listening on port ${port}`));
