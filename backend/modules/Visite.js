var express = require('express')
var conf = require('../config/conf')
const db = require('../utils/db')

const visite = {

    findAll: () => {
        return new Promise(async (resolve, reject) => {
            try {
                const req = `(SELECT v.id AS id,  DATE_FORMAT(c.date_naissance, '%d-%m-%Y') AS date_visite,
                            v.motif AS motif, u.nom AS utilisateur,
                            CONCAT(c.nom,' ',c.postnom,' ',c.prenom) AS client
                            FROM visite v, utilisateur u, client c 
                            WHERE v.utilisateur = u.id
                            AND v.client = c.id) `
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
    find: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const req = `(SELECT v.id AS id, DATE_FORMAT(c.date_naissance, '%d-%m-%Y') AS date_visite,
                            v.motif AS motif, u.nom AS utilisateur,
                            CONCAT(c.nom,' ',c.postnom,' ',c.prenom) AS client
                            FROM visite v, utilisateur u, client c 
                            WHERE v.utilisateur = u.id
                            AND v.client = c.id
                            AND v.client = ? ) 
                            
                            UNION 
                            
                            (SELECT v.id AS id,  DATE_FORMAT(c.date_naissance, '%d-%m-%Y') AS date_visite,
                            v.motif AS motif, u.nom AS utilisateur,
                            CONCAT(c.nom,' ',c.postnom,' ',c.prenom) AS client
                            FROM visite v, utilisateur u, client c 
                            WHERE v.utilisateur = u.id
                            AND v.client = c.id
                            AND v.client IN(SELECT id FROM client WHERE parent = ?) )`
                db.query(req, [id,id], function (err, result, fields) {
                    if (err) throw err;
                    resolve(result)
                });
            } catch (err) {
                console.log(err.message)
                return reject(err)
            }
        })
    },
    findByUser: (user) => {
        return new Promise(async (resolve, reject) => {
            try {
                const req = `SELECT * FROM visite WHERE utilisateur = ?`
                db.query(req, [user], function (err, result, fields) {
                    if (err) throw err;
                    resolve(result)
                });
            } catch (err) {
                console.log(err.message)
                return reject(err)
            }
        })
    },
    findByDate: (date) => {
        return new Promise(async (resolve, reject) => {
            try {
                const req = `SELECT * FROM visite WHERE date_visite = ?`
                db.query(req, [date], function (err, result, fields) {
                    if (err) throw err;
                    resolve(result)
                });
            } catch (err) {
                console.log(err.message)
                return reject(err)
            }
        })
    },
    create: (date, motif, user, patient) => {
        console.log("Creating...")
        return new Promise(async (resolve, reject) => {
            try {
                const req = `INSERT INTO visite(date_visite,motif,utilisateur,client) 
                            VALUES(?,?,?,?)`
                db.query(req, [date, motif, user, patient], function (err, result, fields) {
                    if (err) throw err;
                    resolve(result)
                });
            } catch (err) {
                console.log(err.message)
                return reject(err)
            }
        })
    },
    delete: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const req = `DELETE FROM visite WHERE id=?`
                db.query(req, [id], function (err, result, fields) {
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
module.exports = visite