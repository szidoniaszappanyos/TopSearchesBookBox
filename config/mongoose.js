'use strict'

module.exports = {
    initMongoose: initMongoose
}

const mongoose = require('mongoose');
const config = require('./index');

function initMongoose() {
    mongoose.connect(config.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});

    const db = mongoose.connection;
    db.on('error', () => {
        console.log("error")
    });
    db.once('open', () => {
        console.log("open")
    });
}