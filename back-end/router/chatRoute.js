const express = require('express')
const router = express.Router();
const {saveMessage,getMessage} = require('../controller/chatController')

router.post('/savemsg',saveMessage)
router.get('/messages/:sender/:receiver',getMessage)

module.exports = router;