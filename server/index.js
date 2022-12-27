const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const connectDatabase = require('./config/db');
const { errorHandler } = require('./middleware/ErrorMiddleware');
const cors = require('cors');

connectDatabase();

const app = express();

app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/expenses', require('./routes/ExpenseRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Listening on port ${port}`));
