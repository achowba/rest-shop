var app = '';
const throttle = require("express-throttle-requests");

throttle(app, {
    min: 1000, //Example showing a minimum of 1000ms (1 second)
    max: 5000 //Example showing a maximum of 5000 (5 seconds)
});
