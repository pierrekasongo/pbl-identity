var express = require('express')
const db = require('../utils/db')

const entreprise = {

    find: () => {
        let res;
        return new Promise(function (resolve, reject) {
            try {
                const req = `SELECT * FROM entreprise`
                db.query(req, function (err, result, fields) {
                    if (err) throw err;
                    resolve(result)
                });
            } catch (err) {
                console.log(err.message)
                return reject(err)
            }
        })
    },
    create: (nom) => {
        return new Promise(function (resolve, reject) {
            try {
                const req = `INSERT INTO entreprise(nom) VALUES(?)`
                db.query(req, [nom], function (err, result, fields) {
                    if (err) throw err;
                    resolve(result)
                });
            } catch (err) {
                console.log(err)
                return reject(err)
            }
        })
    },
    delete: (id) => {
        return new Promise(function (resolve, reject) {
            try {
                const req = `DELETE FROM entreprise WHERE id=?`
                db.query(req, [id], function (err, result, fields) {
                    if (err) throw err;
                    resolve(result)
                });
            } catch (err) {
                console.log(err.message)
                return reject(err)
            }
        })
    },
    update: (id, nom) => {
        return new Promise(function (resolve, reject) {
            try {
                const req = `UPDATE entreprise SET nom = ? WHERE id = ?`
                db.query(req, [nom, id], function (err, result, fields) {
                    if (err) throw err;
                    resolve(result)
                });
            } catch (err) {
                console.log(err.message)
                return reject(err)
            }
        })
    }
}
module.exports = entreprise