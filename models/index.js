'use strict'

const Home = require('./homes.js')
const User = require('./users.js')
const db = require('./db.js')

User.hasOne(Home)

async function syncDB() {
    try {
        await db.sync({ force: true })
        console.log('Syncing is done! The database is ready to use')
    } catch (err) {
        console.error('There was an error syncing the database: ', err)
    }
}

syncDB()
