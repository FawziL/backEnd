const knex = require('knex')
/*
const configMariaDB = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'mibase'
    },
    pool: { min: 0, max: 7 }
}
const database = knex(configMariaDB)
*/

const configSQLite3 = {
    client: 'sqlite3',
    connection: {
        filename: './database/chat.sqlite'
    },
}
const database = knex(configSQLite3)

module.exports = database