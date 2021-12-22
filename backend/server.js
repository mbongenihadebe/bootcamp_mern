require('dotenv').config();

const connectDB = require('./config/db')
const express = require('express');
const erorrHandler = require('./middleware/errorHandler');

connectDB();

const app = express();

//Middleware
app.use(express.json());

//Routes
app.use('/api/v1/bootcamps',require('./routes/bootcampRoutes'))

//ErrorHandler
app.use(erorrHandler);

const PORT = process.env.PORT
app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`) )