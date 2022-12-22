const express = require('express');
require('dotenv').config();


const PORT = process.env.PORT || 4000;

const app = express();


//public folder
app.use(express.static('public'));

//routes
app.use('/api/auth', require('./routes/auth'));




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});