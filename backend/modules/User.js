var express = require('express')
const crypto = require('crypto')
const db = require('../utils/db')
const Utils = require('../utils/Utils')
const user = {

    find: () => {
        let res;
        return new Promise(function (resolve, reject) {
            try {
                const req = `SELECT id,login,nom,role,status FROM utilisateur`
                res = db.query(req, function (err, result, fields) {
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
                const req = `SELECT id,login,nom,role FROM utilisateur WHERE login = ? AND status= ? `
                res = db.query(req, [login, 'Actif'], function (err, result, fields) {
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

                const req = `SELECT id,login,nom,role FROM utilisateur WHERE login = ? AND password = ? AND status = ?`
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
                const req = `INSERT INTO utilisateur(login,nom,role,status) VALUES(?,?,?,?)`
                const res = db.query(req, [
                    login, nom, role, 'Actif'
                ], function (err, result, fields) {
                    if (err) throw err;
                    resolve(result)
                });
            } catch (err) {
                console.log(err.message)
                return err
            }
        })
    },
    delete: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const req = `DELETE FROM utilisateur WHERE id=?`
                const res = db.query(req, [id], function (err, result, fields) {
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
                const res = db.query(req, [nom, role, id], function (err, result, fields) {
                    if (err) throw err;
                    resolve(result)
                });
            } catch (err) {
                console.log(err.message)
                return reject()
            }
        })
    },
    updateStatus: (id, status) => {
        return new Promise(async (resolve, reject) => {
            try {
                const req = `UPDATE utilisateur SET status = ? WHERE id = ?`
                const res = db.query(req, [status, id], function (err, result, fields) {
                    if (err) throw err;
                    resolve(result)
                });
            } catch (err) {
                console.log(err.message)
                return reject()
            }
        })
    },
    updatePassword: (id, password) => {
        return new Promise(async (resolve, reject) => {
            try {
                const req = `UPDATE utilisateur SET password = ? WHERE id = ?`
                const res = db.query(req, [password, id], function (err, result, fields) {
                    if (err) throw err;
                    resolve(result)
                });
            } catch (err) {
                console.log(err.message)
                return reject()
            }
        })
    }
}
module.exports = user