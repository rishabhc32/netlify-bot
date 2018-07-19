const express = require('express')
var router  = express.Router()

var build_controller = require('../controllers/buildController')

router.post('/started', build_controller.build_started)

router.post('/succeeded', build_controller.build_succeeded)

router.post('/failed', build_controller.build_failed)

module.exports = router
