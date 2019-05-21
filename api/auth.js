const express = require('express')
const router  = express.Router()

const jwt = require('jsonwebtoken')
const passport = require("passport")

const userModel = require('../models/user')

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }))
router.get('/facebook/return',
    passport.authenticate('facebook', { failureRedirect: '/indradyumna-swami-vyasa-puja-2019/login', session: false }), 
    (req, res) => {
        const {name, email} = req.user._json         
        userModel.findOrCreate({
            where: {
                email
            },
            defaults: {
                name
            }
        }).then(([user, created]) => {
            userData = user.get()
            const token = jwt.sign(userData, 'your_jwt_secret')
            res.cookie('token', token)
            return res.redirect('/indradyumna-swami-vyasa-puja-2019')
        })
    }
)

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/return', 
    passport.authenticate('google', { failureRedirect: '/indradyumna-swami-vyasa-puja-2019/login', session: false }),
    (req, res) => {
        const name = req.user.displayName
        const email = req.user.emails[0].value
        userModel.findOrCreate({
            where: {
                email
            },
            defaults: {
                name
            }
        }).then(([user, created]) => {
            userData = user.get()
            const token = jwt.sign(userData, 'your_jwt_secret')
            res.cookie('token', token)
            return res.redirect('/indradyumna-swami-vyasa-puja-2019')
        })
    }
)

module.exports = router;