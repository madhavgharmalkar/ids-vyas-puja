const user = require('../models/user')
const express = require('express')

const router = express.Router()
const passport = require('passport')

router.post('/create', (req, res) => {
    const data = req.body;

    user.createUser({
        name: data.name,
        email: data.email,
        password: data.password
    }).then((userData) => {
        res.json(userData)
    }).catch((err) => {
        console.log(err)
        res.sendStatus(400)
    })
})

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {password, ...userData} = req.user
    res.json(userData)
})

module.exports = router