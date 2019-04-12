const express = require('express')
const router  = express.Router()

const jwt = require('jsonwebtoken')
const passport = require("passport")

const userModel = require('../models/user')

router.post('/', (req, res) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            console.log(err)
            return res.sendStatus(400)
        }

        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err)
            }

            const token = jwt.sign(user, 'your_jwt_secret')
            res.cookie('token', token); 
            return res.redirect('/')
        })
    })(req, res)
})

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }))
router.get('/facebook/return',
    passport.authenticate('facebook', { failureRedirect: '/login', session: false }), 
    (req, res) => {
        const {name, email} = req.user._json         
        userModel.findOrCreateUser(email, name).then((data) => {
            const token = jwt.sign(data, 'your_jwt_secret')
            res.cookie('token', token); 
            return res.redirect('/')
        })
    }
)

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/return', 
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    (req, res) => {
        console.log(req.user)
        const name = req.user.displayName
        const email = req.user.emails[0].value
        userModel.findOrCreateUser(email, name).then((data) => {
            const token = jwt.sign(data, 'your_jwt_secret')
            res.cookie('token', token); 
            return res.redirect('/')
        })
    }
)

module.exports = router;