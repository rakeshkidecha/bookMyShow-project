const express = require('express')
const CommentCtl = require('../controller/CommentCtl');
const router = express.Router()

router.post('/insertComment',CommentCtl.inserComment);


module.exports = router;