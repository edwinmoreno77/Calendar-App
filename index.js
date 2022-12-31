const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();


const PORT = process.env.PORT || 4000;

const app = express();

//database
dbConnection();

//CORS
app.use(cors())

//public folder
// app.use(express.static('public'));

//read and parse body
app.use(express.json());

//routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//redirect to index.html

// app.get('*', (req, res) => {
//     res.sendFile(__dirname + '/public/index.html');
// });



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});