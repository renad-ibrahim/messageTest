const express = require('express')
const app = express();
const connectToDatabase = require('./config/Database');
const AppError = require('./utils/AppError')
const userRoute = require('./routes/userRoute');
const chatRoute = require('./routes/chatRoute');
const messageRoute = require('./routes/messageRoute');
const ErrorHandler = require('./middleware/ErrorHandler');
require('dotenv').config();
const cors = require('cors');

app.use(cors());
app.options('*', cors());

const port = process.env.PORT || 3000;
const urlDataBase = process.env.DATABASE_URL;
app.use(express.json())
app.use("/api/v1/user", userRoute);
app.use("/api/v1/chat", chatRoute);
app.use("/api/v1/message", messageRoute);

app.all('*', (req, res, next) => {
    next(new AppError(`Cant find ${req.originalUrl} on this server`, 404))
})
app.use(ErrorHandler)


connectToDatabase(urlDataBase)
app.listen(port, () => {
    console.log("localhost:", port)
})