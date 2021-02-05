'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const categoryShema = new Schema({
    name: {
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

module.exports = mongoose.model('category', categoryShema, 'categories');
