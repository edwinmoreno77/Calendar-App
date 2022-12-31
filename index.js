const express = require('express');
const app = express();

const path = require('path');
const logger = require("morgan");
const cors = require('cors');
require('dotenv').config();

const { dbConnection } = require('./database/config');

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())


const PORT = process.env.PORT || 4000;

// const app = express();

// app.use(logger("dev"));


//database
dbConnection();

//CORS
// app.use(cors())

//public folder         //this is for the react app
// app.use(express.static('public'));


//read and parse body
// app.use(express.json());


//routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

app.use(express.static(path.join(__dirname, "./frontend/dist")));


//redirect to index.html   //this is for the react app

// app.get('*', (req, res) => {
//     res.sendFile(__dirname + '/public/index.html');
// });

app.get("*", function (_, res) {
    res.sendFile(
        path.join(__dirname, "./frontend/dist/index.html"),
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