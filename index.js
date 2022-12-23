const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();


const PORT = process.env.PORT || 4000;

const app = express();


//database
dbConnection();


//public folder
app.use(express.static('public'));

//read and parse body
app.use(express.json());

//routes
app.use('/api/auth', require('./routes/auth'));



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});