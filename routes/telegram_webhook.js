var router = require('express').Router()

var triggerBuild_controller = require('../controllers/telegramMessageController')

router.post('/', triggerBuild_controller.handle_webhook)

module.exports = router
