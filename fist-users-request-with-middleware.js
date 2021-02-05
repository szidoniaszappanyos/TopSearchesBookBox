'use strict'

const express = require('express');
const app = express();
const dateHelper = require('./helper')
console.log(dateHelper);


app.use('/users', (req, res, next) => {
    console.log("usr midd");
    res.username = "szidonia";
    next();
})

app.use('/users', (req, res, next) => {
    console.log("pass midd");
    res.passw = "pass"
    next();
})

app.use((req, res, next) => {
    console.log("date helper midd");
    res.timestamp = dateHelper.getTimestamp();
    next();
})

app.get('/users', (req, res, next) => {
    console.log("users request")
    res.json({username: res.username, passw: res.passw, timestamp: res.timestamp})
})


app.listen(3000, () => {
    console.log(`API on port 3000`)
})