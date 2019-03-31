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

router.post('/myoffering', passport.authenticate('jwt', {session: false}), (req, res) => {
    const { offering } = req.body
    const { user_id } = req.user

    offeringsModule.updateInsertOffering(user_id, offering)
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            console.log(err)
            res.sendStatus(500)
        })
})

router.get('/myoffering', passport.authenticate('jwt', {session: false}), (req, res) => {
    const { user_id } = req.user

    offeringsModule.getUserOffering(user_id)
        .then((data) => {
            if (data.rowCount) {
                res.json(data.rows[0])
            } else {
                res.json({
                    offering: ""
                })
            }
        })
        .catch((err) =>  {
            console.log(err)
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