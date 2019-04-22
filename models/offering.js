const Sequelize = require('sequelize');
const sequelize = require('../utils/db')

const User = require('./user')

const Offering = sequelize.define('offering', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true 
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    offering: Sequelize.TEXT
})

Offering.belongsTo(User)

Offering.sync().then()
module.exports = Offering