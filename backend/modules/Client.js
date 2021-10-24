const express = require('express')
const winston = require('winston')
const db = require('../utils/db')

const client = {

    find: (id) => {
        return new Promise(function (resolve, reject) {
            try {
                let req, res
                if (id) {
                    req = `SELECT cl.id AS id, prenom, cl.nom AS nom, postnom,
                            sexe,DATE_FORMAT(cl.date_naissance, '%d-%m-%Y') AS date_naissance,photo,
                            localisation,num_id,ent.nom AS entreprise 
                            FROM client cl, entreprise ent
                            WHERE cl.entreprise = ent.id
                            AND parent = 0 OR parent = NULL
                            AND cl.id = ?`
                    db.query(req, [id], function (err, result, fields) {
                        if (err) throw err;
                        resolve(result)
                    });
                } else {
                    req = `SELECT cl.id AS id, prenom, cl.nom AS nom, postnom,
                        sexe,DATE_FORMAT(cl.date_naissance, '%d-%m-%Y') AS date_naissance,photo,
                        localisation,num_id,ent.nom AS entreprise 
                        FROM client cl, entreprise ent
                        WHERE cl.entreprise = ent.id
                        AND parent = 0 OR parent = NULL`
                    db.query(req, function (err, result, fields) {
                        if (err) throw err;
                        resolve(result)
                    });
                }
            } catch (err) {
                console.log(err.message)
                return reject(err)
            }
        })
    },

    findByParent: (parent) => {
        return new Promise(function (resolve, reject) {
            try {
                req = `SELECT id, prenom, nom, 
                    postnom,sexe,DATE_FORMAT(date_naissance, '%d-%m-%Y') AS date_naissance,photo,localisation,relation
                    FROM client WHERE parent = ?`
                db.query(req, [parent], function (err, result, fields) {
                    if (err) throw err;
                    resolve(result)
                });
            } catch (err) {
                console.log(err.message)
                return reject(err)
            }
        })
    },
    findWithInclude: (parent) => {
        return new Promise(function (resolve, reject) {
            try {
                req = `SELECT id, prenom, nom, 
                    postnom,sexe,DATE_FORMAT(date_naissance, '%d-%m-%Y') AS date_naissance,photo,localisation,relation
                    FROM client WHERE parent = ? 
                    UNION 
                    SELECT id, prenom, nom, 
                    postnom,sexe,DATE_FORMAT(date_naissance, '%d-%m-%Y') AS date_naissance,photo,localisation,relation
                    FROM client WHERE id = ?`
                db.query(req, [parent,parent], function (err, result, fields) {
                    if (err) throw err;
                    resolve(result)
                });
            } catch (err) {
                console.log(err.message)
                return reject(err)
            }
        })
    },
    findParents: () => {
        console.log("Finding parents...")
        return new Promise(function (resolve, reject) {
            try {
                const req = `SELECT cl.id AS id, prenom, cl.nom AS nom, postnom,sexe,
                                DATE_FORMAT(cl.date_naissance, '%d-%m-%Y') AS date_naissance,photo,
                                localisation,num_id,ent.id AS entreprise_id,ent.nom AS entreprise 
                                FROM client cl, entreprise ent
                                WHERE cl.entreprise = ent.id
                                AND parent = 0`
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
    findByCompany: (company) => {
        return new Promise(function (resolve, reject) {
            try {
                const req = `SELECT * FROM client WHERE entreprise = ?`
                db.query(req, [company], function (err, result, fields) {
                    if (err) throw err;
                    resolve(result)
                });
            } catch (err) {
                console.log(err.message)
                return reject(err)
            }
        })
    },
    create: (prenom, nom, postnom, sexe, date_naissance, photo, localisation,
        num_id, entreprise, parent, relation) => {
        return new Promise(function (resolve, reject) {
            try {
                const req = `INSERT INTO client(prenom, nom, postnom,sexe,date_naissance,photo,
                    localisation,num_id,entreprise,parent,relation) VALUES(?,?,?,?,?,?,?,?,?,?,?)`
                db.query(req, [prenom, nom, postnom, sexe, date_naissance,
                    photo, localisation, num_id, entreprise, parent, relation], function (err, result, fields) {
                        if (err) throw err;
                        resolve(result)
                });
            } catch (err) {
                console.log(err.message)
                return reject(err)
            }
        })
    },
    createChild: (prenom, nom, postnom, sexe, date_naissance, photo, parent, relation) => {
        return new Promise(function (resolve, reject) {
            try {
                const req = `INSERT INTO client(prenom, nom, postnom,sexe,date_naissance,photo,
                ,parent,relation) VALUES(?,?,?,?,?,?,?,?) `
                db.query(req, [prenom, nom, postnom, sexe, date_naissance,
                    photo, parent, relation], function (err, result, fields) {
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
        return new Promise(function (resolve, reject) {
            try {
                const req = `DELETE FROM client WHERE id=?`
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
    update: (id, prenom, nom, postnom, sexe, date_naissance, localisation,
        num_id, entreprise) => {
        return new Promise(function (resolve, reject) {
            try {
                const req = `UPDATE client SET prenom = ?,nom=?, postnom=?,sexe=?,date_naissance=?,
                localisation=?,num_id=?,entreprise=? WHERE id = ?`
                db.query(req, [prenom, nom, postnom, sexe, date_naissance, localisation,
                    num_id, entreprise, id], function (err, result, fields) {
                        if (err) throw err;
                        resolve(result)
                });
            } catch (err) {
                console.log(err.message)
                return reject(err)
            }
        })
    },
    uploadPhoto: (id, photo) => {
        return new Promise(function (resolve, reject) {
            try {
                const req = `UPDATE client SET photo = ? WHERE id = ?`
                db.query(req, [photo, id], function (err, result, fields) {
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
module.exports = client