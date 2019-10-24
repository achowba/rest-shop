const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const fs = require('fs');

const app = express();

require('dotenv').config();

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users');

// connect to db
let db = mongoose.connection;
mongoose.connect(`mongodb+srv://achowba:${process.env.MONGO_ATLAS_PW}@node-rest-shop-kcqum.mongodb.net/shop?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// listen for DB connect event
db.on('open', () => {
    console.log('Database Connected!');
});

// listen for DB connection error event
db.on('error', (error) => {
    console.log(`Failed to connect to Database. \n${error}`);
});

// set delay to simulate slow connection
/* app.use((req, res, next) => {
    setTimeout(next, 4000);
}); */


/* app.use(cors({
    origin: "http://localhost:2806", // restrict calls to those this address
})); */

// set headers to allow cors
app.use((req, res, next) => {

    res.header('Access-Control-Allow-Origin', '*'); // replace localhost with actual host
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, PATCH, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization');

    // res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next(); // move to the next middleware
});

/* middlewares */
// set static folder
app.use('/uploads', express.static('uploads'));
app.use('/playground', express.static('playground'));

// configure morgan middleware
app.use(morgan('dev'));
app.use(morgan('common', {
    stream: fs.createWriteStream('./access.log', {flags: 'a'})
}));

// configure bodyParser middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// allow cors
app.use(cors());

// create routes
app.use('/products', productRoutes); // forward all request aimed at /products to productRoutes
app.use('/orders', orderRoutes); // forward all request aimed at /orders to orderRoutes
app.use('/users', userRoutes); // forward all request aimed at /orders to orderRoutes

app.use('/playground', (req, res, next) => {
    res.sendFile('./playground/index.html')
});

// middleware to handle errors
app.use((req, res, next) => {
    const error = new Error('Route Does Not Exist 😢');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        }
    });
});

module.exports = app;
