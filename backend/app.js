const express = require('express');
const app = express();
require('dotenv').config();
const authRouter = require('./router/authRoute');
const dataBaseConnect = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// connect to DB
dataBaseConnect();

// Express Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.CLIENT_URL],
    credentials: true
}));


app.use('/api/auth',authRouter);  // path to redirect to authRouter


app.use('/',(req,res)=>{
    res.status(200).json({ data:'JWTauth Server --updated'});
});

module.exports = app;