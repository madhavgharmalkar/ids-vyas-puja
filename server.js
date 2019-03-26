require('dotenv').config()

const express = require('express')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

require('./utils/passport')

const PORT = process.env.PORT || 3000   

app.prepare().then(() => {
    const server = express()

    server.use('/api', express.json())
    server.use('/api', require('./api/api'))


    server.get('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(PORT, () => {
        console.log(`server listening on port ${PORT}`)
    })
})
