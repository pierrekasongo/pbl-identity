var express = require('express')
const crypto = require('crypto')
const db = require('../utils/db')
const Utils = require('../utils/Utils')
const user = {

    find: () => {
        let res;
        return new Promise(function (resolve, reject) {
            try {
                const req = `SELECT id,login,nom,role,entreprise,status FROM utilisateur`
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
    findByLogin: (login) => {
        return new Promise(function (resolve, reject) {
            let res;
            try {
                const req = `SELECT id,login,nom,role,entreprise FROM utilisateur WHERE login = ? AND status= ? `
                db.query(req, [login, 'Actif'], function (err, result, fields) {
                    if (err) throw err;
                    resolve(result)
                });
            } catch (err) {
                console.log(err.message)
                return reject(err)
            }
        })
    },
    login: (login, password) => {
        return new Promise(function (resolve, reject) {
            try {

                const req = `SELECT id,login,nom,role,entreprise FROM utilisateur WHERE login = ? AND password = ? AND status = ?`
                db.query(req, [login, password, 'Actif'], function (err, result, fields) {
                    if (err) throw err;
                    resolve(result)
                });
            } catch (err) {
                console.log(err.message)
                return reject(err)
            }
        })
    },
    create: (login, nom, role) => {
        return new Promise(function (resolve, reject) {
            try {
                const req = `INSERT INTO utilisateur(login,nom,role,status,entreprise) VALUES(?,?,?,?,?)`
                db.query(req, [
                    login, nom, role, 'Actif'
                ], function (err, result, fields) {
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
                const req = `DELETE FROM utilisateur WHERE id=?`
                db.query(req, [id], function (err, result, fields) {
                    if (err) throw err;
                    resolve(result)
                });
            } catch (err) {
                console.log(err.message)
                return reject()
            }

        })
    },
    update: (id, nom, role) => {
        return new Promise(async (resolve, reject) => {
            try {
                const req = `UPDATE utilisateur SET nom = ?, role = ? WHERE id = ?`
                db.query(req, [nom, role, id], function (err, result, fields) {
                    if (err) throw err;
                    resolve(result)
                });
            } catch (err) {
                console.log(err.message)
                return reject(err)
            }
        })
    },
    updateStatus: (id, status) => {
        return new Promise(async (resolve, reject) => {
            try {
                const req = `UPDATE utilisateur SET status = ? WHERE id = ?`
                db.query(req, [status, id], function (err, result, fields) {
                    if (err) throw err;
                    resolve(result)
                });
            } catch (err) {
                console.log(err.message)
                return reject(err)
            }
        })
    },
    updatePassword: (id, password) => {
        return new Promise(async (resolve, reject) => {
            try {
                const req = `UPDATE utilisateur SET password = ? WHERE id = ?`
                db.query(req, [password, id], function (err, result, fields) {
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
module.exports = user