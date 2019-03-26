const express = require('express')

const router = express.Router()
const passport = require('passport')

const offeringsModule = require('../models/offerings')

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    offeringsModule.getOfferings(req.user.user_id)
        .then((rows) => {
            res.json(rows)
        })
        .catch((err) => {
            res.sendStatus(500)
        })
})

router.post('/like', passport.authenticate('jwt', {session: false}), (req, res) => {
    if (!req.body.like) {
        offeringsModule.unlikeOffering(req.user.user_id, req.body.offeringId)
            .then((rows) => res.sendStatus(200))
            .catch((err) => {
                res.sendStatus(500)
            })

        return
    }

    offeringsModule.likeOffering(req.user.user_id, req.body.offeringId)
        .then((rows) => res.sendStatus(200))
        .catch((err) => {
            res.sendStatus(500)
        })
})

module.exports = router