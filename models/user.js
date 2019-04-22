const Sequelize = require('sequelize')
const sequelize = require('../utils/db')

const User = sequelize.define('user', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    name: Sequelize.TEXT,
    email: Sequelize.STRING,
    language: {
        type: Sequelize.STRING,
        defaultValue: 'EN'
    }
})

User.sync().then()

module.exports = User