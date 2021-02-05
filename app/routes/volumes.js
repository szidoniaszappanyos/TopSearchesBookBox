'use strict'

const express = require('express')
const controller = require('../controllers/volumes')
const router = express.Router();



router.get('/volumes/all', controller.findVolumes, controller.responseToJson("volumes"));

router.get('/volumes', controller.findVolumesMiddWithFilter, controller.responseToJson("volumes"));

router.post('/volumes', controller.createVolume)



module.exports = router;
