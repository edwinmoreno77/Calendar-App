const express = require('express');
const app = express();
const { dbConnection } = require('./database/config');

const path = require('path');
const logger = require("morgan");
const PORT = process.env.PORT || 4000;

//CORS
const cors = require('cors');
//DOTENV
require('dotenv').config();


app.use(logger("dev"));

//read and parse body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

//database
dbConnection();

//routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

app.use(express.static(path.join(__dirname, "./frontend/build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});