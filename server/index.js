const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const connectDatabase = require('./config/db');
const { errorHandler } = require('./middleware/ErrorMiddleware');
const cors = require('cors');
const bodyparser = require("body-parser");

connectDatabase();

const app = express();

app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/expenses', require('./routes/ExpenseRoutes'));
app.use('/api/users', require('./routes/UserRoutes'));

app.use(errorHandler);

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.listen(port, () => console.log(`Listening on port ${port}`));
