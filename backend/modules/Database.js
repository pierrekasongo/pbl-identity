var express = require('express')
var conf = require('../config/conf')
const db = require('../utils/db')

const parameter = {

    find: () => {
        return new Promise(async (resolve, reject) => {
            try {
                const pool = db.connect()
                const req = `SELECT table_name
                                FROM information_schema.tables
                                WHERE table_schema = 'public'
                                ORDER BY table_name`
                const res = await pool.query(req)
                resolve(res)
            } catch (err) {
                console.log(err.message)
                reject()
            }
        })
    },
    
    drop: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const pool = db.connect()
                const req = `DELETE FROM visite WHERE id=?`
                const res = await pool.query(req, [id])
                resolve(res)
            } catch (err) {
                console.log(err.message)
                reject()
            }
        })
    }
}
module.exports = parameter