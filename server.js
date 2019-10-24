const http = require('http');
// const throttle = require("express-throttle-requests");

const app = require('./app');

const port = process.env.PORT || 2806;
const server = http.createServer(app);

/* // throttle server to simulate slow connection
throttle(app, {
    min: 50, //Example showing a minimum of 1000ms (1 second)
    max: 100 //Example showing a maximum of 5000 (5 seconds)
});
 */
server.listen((port));
