const express = require('express')
const winston = require('winston')
const db = require('../utils/db')

const client = {

    find: (id) => {
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
                res = db.query(req, [id])
            } else {
                req = `SELECT cl.id AS id, prenom, cl.nom AS nom, postnom,
                        sexe,DATE_FORMAT(cl.date_naissance, '%d-%m-%Y') AS date_naissance,photo,
                        localisation,num_id,ent.nom AS entreprise 
                        FROM client cl, entreprise ent
                        WHERE cl.entreprise = ent.id
                        AND parent = 0 OR parent = NULL`
                res = db.query(req)
            }
            return res
        } catch (err) {
            console.log(err.message)
            return err
        }
    },

    findByParent: (parent) => {
        try {
            req = `SELECT id, prenom, nom, 
                    postnom,sexe,DATE_FORMAT(cl.date_naissance, '%d-%m-%Y') AS date_naissance,photo,localisation,relation
                    FROM client WHERE parent = ?`
            const res = db.query(req, [parent], function (err, result, fields) {
                if (err) throw err;
                resolve(result)
            });
        } catch (err) {
            console.log(err.message)
            return reject(err)
        }
    },
    findWithInclude: (parent) => {
        try {
            req = `SELECT id, prenom, nom, 
                    postnom,sexe,DATE_FORMAT(cl.date_naissance, '%d-%m-%Y') AS date_naissance,photo,localisation,relation
                    FROM client WHERE parent = ? 
                    UNION 
                    SELECT id, prenom, nom, 
                    postnom,sexe,DATE_FORMAT(cl.date_naissance, '%d-%m-%Y') AS date_naissance,photo,localisation,relation
                    FROM client WHERE id = ?`
            const res = db.query(req, [parent], function (err, result, fields) {
                if (err) throw err;
                resolve(result)
            });
        } catch (err) {
            console.log(err.message)
            return reject(err)
        }
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
                const res = db.query(req, function (err, result, fields) {
                    if (err) throw err;
                    resolve(result)
                });
            } catch (err) {
                console.log(err.message)
                return err
            }
        })
    },
    findByCompany: (company) => {
        return new Promise(function (resolve, reject) {
            try {
                const req = `SELECT * FROM client WHERE entreprise = ?`
                const res = db.query(req, [company], function (err, result, fields) {
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
        try {
            const req = `INSERT INTO client(prenom, nom, postnom,sexe,date_naissance,photo,
                    localisation,num_id,entreprise,parent,relation) VALUES(?,?,?,?,?,?,?,?,?,?,?)`
            const res = db.query(req, [prenom, nom, postnom, sexe, date_naissance,
                photo, localisation, num_id, entreprise, parent, relation], function (err, result, fields) {
                    if (err) throw err;
                    resolve(result)
                });
            } catch (err) {
                console.log(err.message)
                return reject(err)
            }
    },
    createChild: (prenom, nom, postnom, sexe, date_naissance, photo, parent, relation) => {
        try {
            const req = `INSERT INTO client(prenom, nom, postnom,sexe,date_naissance,photo,
                ,parent,relation) VALUES(?,?,?,?,?,?,?,?) `
            const res = db.query(req, [prenom, nom, postnom, sexe, date_naissance,
                photo, parent, relation], function (err, result, fields) {
                    if (err) throw err;
                    resolve(result)
                });
            } catch (err) {
                console.log(err.message)
                return reject(err)
            }
    },
    delete: (id) => {
        try {
            const req = `DELETE FROM client WHERE id=?`
            const res = db.query(req, [id], function (err, result, fields) {
                if (err) throw err;
                resolve(result)
            });
        } catch (err) {
            console.log(err.message)
            return reject(err)
        }
    },
    update: (id, prenom, nom, postnom, sexe, date_naissance, localisation,
        num_id, entreprise) => {
        try {
            const req = `UPDATE client SET prenom = ?,nom=?, postnom=?,sexe=?,date_naissance=?,
                localisation=?,num_id=?,entreprise=? WHERE id = ?`
            const res = db.query(req, [prenom, nom, postnom, sexe, date_naissance, localisation,
                num_id, entreprise, id], function (err, result, fields) {
                    if (err) throw err;
                    resolve(result)
                });
            } catch (err) {
                console.log(err.message)
                return reject(err)
            }
    },
    uploadPhoto: (id, photo) => {
        try {
            const req = `UPDATE client SET photo = ? WHERE id = ?`
            const res = db.query(req, [photo, id], function (err, result, fields) {
                if (err) throw err;
                resolve(result)
            });
        } catch (err) {
            console.log(err.message)
            return reject(err)
        }
    }
}
module.exports = client