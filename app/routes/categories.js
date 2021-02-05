'use strict'

const express = require('express')
const controller = require('../controllers/categories')
const router = express.Router();



router.get('/categories/all', controller.findCategories, controller.responseToJson("categories"));

router.get('/categories', controller.findCategoriesMiddWithFilter, controller.responseToJson("categories"));

router.post('/categories', controller.createCategory)



module.exports = router;
