const {Pool, Client} = require("pg")
const conf = require('../config/conf')

const cred = {
    user: conf.DB_USER,
    host: conf.DB_HOST,
    database: conf.DB_NAME,
    password: conf.DB_PWD,
    port: conf.DB_PORT
}

const db = {

    connect: () => {
        return new Pool(cred)
    }
}

module.exports = db

