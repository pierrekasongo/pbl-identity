const express = require('express')
const winston = require('winston')
const db = require('../utils/db')

const client = {

    find: (id) => {
        return new Promise(function (resolve, reject) {
            try {
                let req, res
                if (id && id > 0) {
                    req = `SELECT cl.id AS id, prenom, cl.nom AS nom, postnom,
                            sexe,DATE_FORMAT(cl.date_naissance, '%d-%m-%Y') AS date_naissance,photo,
                            localisation,num_id,num_dossier,ent.nom AS entreprise 
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
                        localisation,num_id,num_dossier,ent.nom AS entreprise 
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
                req = `SELECT id, prenom, nom, num_dossier,
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

    findMemberByID: (id) => {
        return new Promise(function (resolve, reject) {
            try {
                req = `SELECT id, prenom, nom, num_dossier,
                    postnom,sexe,DATE_FORMAT(date_naissance, '%d-%m-%Y') AS date_naissance,photo,localisation,relation
                    FROM client WHERE id = ?`
                db.query(req, [id], function (err, result, fields) {
                    if (err) throw err;
                    console.log("Member ", result)
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
                req = `SELECT id, prenom, nom, num_dossier,
                    postnom,sexe,DATE_FORMAT(date_naissance, '%d-%m-%Y') AS date_naissance,photo,localisation,relation
                    FROM client WHERE parent = ? 
                    UNION 
                    SELECT id, prenom, nom, num_dossier,
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
                                localisation,num_id,num_dossier,ent.id AS entreprise_id,ent.nom AS entreprise 
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
                console.log("Comp ",company)
                const req = `SELECT cl.id AS id, prenom, cl.nom AS nom, postnom,sexe,
                                DATE_FORMAT(cl.date_naissance, '%d-%m-%Y') AS date_naissance,photo,
                                localisation,num_id,num_dossier,ent.id AS entreprise_id,ent.nom AS entreprise 
                                FROM client cl, entreprise ent
                                WHERE cl.entreprise = ? 
                                AND parent = 0
                                AND cl.entreprise = ent.id`
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
        num_id, num_dossier,entreprise, parent, relation) => {
        return new Promise(function (resolve, reject) {
            try {
                const req = `INSERT INTO client(prenom, nom, postnom,sexe,date_naissance,
                    localisation,num_id,num_dossier,entreprise,parent,relation) VALUES(?,?,?,?,?,?,?,?,?,?,?)`
                db.query(req, [prenom, nom, postnom, sexe, date_naissance,
                    localisation, num_id, num_dossier,entreprise, parent, relation], function (err, result, fields) {
                        if (err) throw err;
                        console.log("Res ",result)
                        resolve(result)
                });
            } catch (err) {
                console.log(err.message)
                return reject(err)
            }
        })
    },
    createChild: (prenom, nom, postnom, sexe, date_naissance, photo,num_dossier, parent, relation) => {
        return new Promise(function (resolve, reject) {
            try {
                const req = `INSERT INTO client(prenom, nom, postnom,sexe,date_naissance,photo,
                num_dossier,parent,relation) VALUES(?,?,?,?,?,?,?,?,?) `
                db.query(req, [prenom, nom, postnom, sexe, date_naissance,
                    photo,num_dossier, parent, relation], function (err, result, fields) {
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
                localisation=?,num_id=?,num_dossier=?,entreprise=? WHERE id = ?`
                db.query(req, [prenom, nom, postnom, sexe, date_naissance, localisation,
                    num_id, num_dossier, entreprise, id], function (err, result, fields) {
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