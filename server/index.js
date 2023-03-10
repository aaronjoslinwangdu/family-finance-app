const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const connectDatabase = require('./config/db');
const { errorHandler } = require('./middleware/ErrorMiddleware');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

connectDatabase();

const app = express();

app.use(cookieParser());

app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/expenses', require('./routes/ExpenseRoutes'));
app.use('/api/users', require('./routes/UserRoutes'));
app.use('/auth', require('./routes/AuthRoutes'));

app.use(errorHandler);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => console.log(`Listening on port ${port}`));
