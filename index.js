const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
const path = require('path');
const logger = require("morgan");

require('dotenv').config();


const PORT = process.env.PORT || 4000;

const app = express();

app.use(logger("dev"));


//database
dbConnection();

//CORS
app.use(cors())

//public folder         //this is for the react app
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, "./public")));


//read and parse body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//redirect to index.html   //this is for the react app

// app.get('*', (req, res) => {
//     res.sendFile(__dirname + '/public/index.html');
// });

app.get("*", function (_, res) {
    res.sendFile(
        path.join(__dirname, "./public/index.html"),
        function (err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    );
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});