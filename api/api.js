const express = require('express')
const router = express.Router()

const create = require('./user')
const login = require('./auth')
const offerings = require('./offerings')

router.use('/user', create)
router.use('/login', login)
router.use('/offerings', offerings)

module.exports = router