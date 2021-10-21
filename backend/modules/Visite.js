var express = require('express')
var conf = require('../config/conf')
const db = require('../utils/db')

const visite = {

    findAll:() =>{
        try{
            const req = `(SELECT v.id AS id,  DATE_FORMAT(cl.date_naissance, '%d-%m-%Y') AS date_visite,
                            v.motif AS motif, u.nom AS utilisateur,
                            CONCAT(c.nom,' ',c.postnom,' ',c.prenom) AS client
                            FROM visite v, utilisateur u, client c 
                            WHERE v.utilisateur = u.id
                            AND v.client = c.id) `
            const res =   db.query(req)
            return res
        }catch(err){
            console.log(err.message)
            return err
        }
    },
    find:(id) =>{
        try{
            const req = `(SELECT v.id AS id, DATE_FORMAT(cl.date_naissance, '%d-%m-%Y') AS date_visite,
                            v.motif AS motif, u.nom AS utilisateur,
                            CONCAT(c.nom,' ',c.postnom,' ',c.prenom) AS client
                            FROM visite v, utilisateur u, client c 
                            WHERE v.utilisateur = u.id
                            AND v.client = c.id
                            AND v.client = ? ) 
                            
                            UNION 
                            
                            (SELECT v.id AS id,  DATE_FORMAT(cl.date_naissance, '%d-%m-%Y') AS date_visite,
                            v.motif AS motif, u.nom AS utilisateur,
                            CONCAT(c.nom,' ',c.postnom,' ',c.prenom) AS client
                            FROM visite v, utilisateur u, client c 
                            WHERE v.utilisateur = u.id
                            AND v.client = c.id
                            AND v.client IN(SELECT id FROM client WHERE parent = ?) )`
            const res =   db.query(req, [id])
            return res
        }catch(err){
            console.log(err.message)
            return err
        }
    },
    findByUser:(user) =>{
        try{
            const req = `SELECT * FROM visite WHERE utilisateur = ?`
            const res =   db.query(req,[user])
            return res
        }catch(err){
            console.log(err.message)
            return err
        }
    },
    findByDate:(date) =>{
        try{
            const req = `SELECT * FROM visite WHERE date_visite = ?`
            const res =   db.query(req,[date])
            return res
        }catch(err){
            console.log(err.message)
            return err
        }
    },
    create:(date,motif,user,patient) =>{
        console.log("Creating...")
        try{
            const req = `INSERT INTO visite(date_visite,motif,utilisateur,client) 
                            VALUES(?,?,?,?)`
            const res =   db.query(req,[date,motif,user,patient])
            return res
        }catch(err){
            console.log(err.message)
            return err
        }
    },
    delete:(id) =>{
        try{
            const req = `DELETE FROM visite WHERE id=?`
            const res =   db.query(req,[id])
            return res
        }catch(err){
            console.log(err.message)
            return err
        }
    }
}
module.exports = visite