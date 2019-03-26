const express = require('express')
const router  = express.Router()

const jwt = require('jsonwebtoken')
const passport = require("passport")

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
            return res.json({token})
        })
    })(req, res)
})

module.exports = router;