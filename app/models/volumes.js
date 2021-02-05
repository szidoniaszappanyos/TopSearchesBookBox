'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const volumesShema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    accessCount: {
        type: Number,
        required: true,
        unique: false
    }
});

module.exports = mongoose.model('volume', volumesShema, 'volumes');
