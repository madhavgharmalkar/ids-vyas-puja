const bcrypt = require('bcrypt')

const db = require('../utils/db')

async function createUser({name, email, password}) {
    hashed_password = await bcrypt.hash(password, 10)

    const query_string =  `INSERT INTO user_data(name, email, password) VALUES($1, $2, $3) RETURNING name, email, user_id;`
    const res = await db.query(query_string, [name, email, hashed_password])

    return res.rows[0]
}

async function findUser(email, password) {
    const query_string = `select * from user_data where email = $1`
    const res = await db.query(query_string, [email])
    const selectData = res.rows[0]
    
    if (res.rowCount && bcrypt.compareSync(password, selectData.password)) {
        return res.rows[0]
    } else {
        return null
    }
}

async function findUserById(id) {
    const query_string = `select * from user_data where user_id = $1`
    const res = await db.query(query_string, [id])
    
    if (res.rowCount) {
        return res.rows[0]
    } else {
        return null
    }
}


module.exports = {
    createUser,
    findUser,
    findUserById
}