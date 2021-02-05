'use strict'

const express = require('express')
const controller = require('../controllers/users')
const router = express.Router();


router.get('/usersById', controller.findUsersById);

router.get('/users/all', controller.findUsersMidd, controller.responseToJson("users"));

router.post('/users', controller.createUser)

router.delete('/users', controller.deleteOne)


module.exports = router;