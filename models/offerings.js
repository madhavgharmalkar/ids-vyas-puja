const db = require('../utils/db')

async function getOfferings(userId) {
    const queryString = `
        SELECT name, created_at, offering, offerings.offering_id, coalesce(offering_likes.user_id = $1, false) liked
        FROM offerings
        LEFT JOIN offering_likes
        ON (offerings.offering_id = offering_likes.offering_id)
        INNER JOIN user_data
        ON (offerings.user_id = user_data.user_id)
    `
    const res = await db.query(queryString, [userId])
    return res.rows
}

async function getUserOffering(userId) {
    const queryString = `
        SELECT *
        FROM offerings
        WHERE user_id = $1;
    `
    
    const res = await db.query(queryString, [userId])
    return res
}

async function updateInsertOffering(userId, offering) {
    const queryString = `
        INSERT INTO offerings (user_id, offering)
        VALUES ($1, $2)
        ON CONFLICT (user_id)
        DO UPDATE SET offering = EXCLUDED.offering
        RETURNING *;
    `

    const res = await db.query(queryString, [userId, offering])
    return res.rows[0]
}

async function likeOffering(userId, offeringId) {
    const queryString = `
        INSERT INTO offering_likes
        VALUES ($1, $2)
        RETURNING *;
    `

    const res = await db.query(queryString, [userId, offeringId])
    return res.rows[0]
}

async function unlikeOffering(userId, offeringId) {
    const queryString = `
        DELETE FROM offering_likes
        WHERE user_id = $1 AND offering_id = $2;
    ` 

    const res = await db.query(queryString, [userId, offeringId])
    return res
}


module.exports = {
    getOfferings,
    likeOffering,
    unlikeOffering,
    updateInsertOffering,
    getUserOffering
}