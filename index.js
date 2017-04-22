const express = require('express');
import bodyParser from 'body-parser';
import flash from 'connect-flash';
const app = express();
const port = 3000;
import mongoose from 'mongoose';
import Users from './user/Model';


//Connect to mongodb
mongoose.connect('mongodb://localhost/UserDB');

//connection and error checking
mongoose.connection.once('open',() => {
    console.log("Connection has been made");
}).on('error',error => {
    console.log("Connection Error:",error);
});


//body parser middleware
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use('/user', require('./user'));

app.listen(port, () => {
    console.log(`Running server on ${port}`);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
res.send(`Error: ${err.message}`);
});

