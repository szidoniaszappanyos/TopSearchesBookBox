'use strict'

const express = require('express');
const app = express();
const config = require('./config/index')
const cors = require('cors');

require('./config/mongoose').initMongoose();
require('./config/express').initE(app);
require('./config/routes').initRoutes(app);

app.use(cors());

app.all('*', function (req, res, next) {
    console.log("url does not exist");
    return res.status(404).json({
        message: `Can't find ${req.url} on this server`
    })
})

app.use(function (err, req, res, next) {
    console.log("error", err)
    return res.status(err.statusCode || 500).json({error: err});
})

app.listen(config.PORT, () => {
    console.log(`API on port ${config.PORT}`)
})
