const express = require('express')
const router = express.Router()

const passport = require('passport')
const Sequelize = require('sequelize')
const Op = Sequelize.Op 

const offeringsModel = require('../models/offering')
const userModel = require('../models/user')

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {
        limit = 10,
        offset = 0,  
    } = req.query

    const currentTime = req.query.now ? new Date(parseInt(req.query.now)) : new Date()

    offeringsModel.findAll({
        limit,
        offset: parseInt(offset),
        order: [['createdAt', 'DESC']],
        attributes: ['createdAt', 'offering', 'id'],
        include: [{
            model: userModel,
            attributes: ['name']
        }],
        where: {
            createdAt: {
                [Op.lte]: currentTime
            }
        }
    }).then((offerings) => {
        res.json(offerings)

    })
    .catch((err) => {
        console.log(err)
        res.sendStatus(500)
    })
})

router.post('/myoffering', passport.authenticate('jwt', {session: false}), (req, res) => {
    const { offering } = req.body
    const { id } = req.user
    console.log(id)

    offeringsModel.update({
            offering: offering
        },
        {
            where: {
                userId: id
            }
        }
    ).then((offering) => res.json(offering))
})

router.get('/myoffering', passport.authenticate('jwt', {session: false}), (req, res) => {
    const { id } = req.user
    console.log(id)

    offeringsModel.findOrCreate({
        where: {
            userId: id
        },
        defaults: {
            offering: ''
        }
    }).then(([offering]) => {
        res.json(offering.get())
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