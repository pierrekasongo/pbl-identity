var express = require('express')
var conf = require('../config/conf')
const db = require('./db')

const visite = {

    findAll:() =>{
        return new Promise(async (resolve, reject)=>{
            try{
                const pool = db.connect()
                const req = `(SELECT v.id AS id, TO_CHAR(v.date_visite, 'dd-mm-yyyy') AS date_visite,
                                v.motif AS motif, u.nom AS utilisateur,
                                CONCAT(c.nom,' ',c.postnom,' ',c.prenom) AS client
                                FROM visite v, utilisateur u, client c 
                                WHERE v.utilisateur = u.id
                                AND v.client = c.id) `
                const res =  await pool.query(req)
                resolve(res)
            }catch(err){
                console.log(err.message)
                reject()
            }
        })
    },
    find:(id) =>{
        return new Promise(async (resolve, reject)=>{
            try{
                const pool = db.connect()
                const req = `(SELECT v.id AS id,TO_CHAR(v.date_visite, 'dd-mm-yyyy') AS date_visite,
                                v.motif AS motif, u.nom AS utilisateur,
                                CONCAT(c.nom,' ',c.postnom,' ',c.prenom) AS client
                                FROM visite v, utilisateur u, client c 
                                WHERE v.utilisateur = u.id
                                AND v.client = c.id
                                AND v.client = $1 ) 
                                
                                UNION 
                                
                                (SELECT v.id AS id, TO_CHAR(v.date_visite, 'dd-mm-yyyy') AS date_visite,
                                v.motif AS motif, u.nom AS utilisateur,
                                CONCAT(c.nom,' ',c.postnom,' ',c.prenom) AS client
                                FROM visite v, utilisateur u, client c 
                                WHERE v.utilisateur = u.id
                                AND v.client = c.id
                                AND v.client IN(SELECT id FROM client WHERE parent = $1) )`
                const res =  await pool.query(req, [id])
                resolve(res)
            }catch(err){
                console.log(err.message)
                reject()
            }
        })
    },
    findByUser:(user) =>{
        return new Promise(async (resolve, reject)=>{
            try{
                const pool = db.connect()
                const req = `SELECT * FROM visite WHERE utilisateur = $1`
                const res =  await pool.query(req,[user])
                resolve(res)
            }catch(err){
                console.log(err.message)
                reject()
            }
        })
    },
    findByDate:(date) =>{
        return new Promise(async (resolve, reject)=>{
            try{
                const pool = db.connect()
                const req = `SELECT * FROM visite WHERE date_visite = $1`
                const res =  await pool.query(req,[date])
                resolve(res)
            }catch(err){
                console.log(err.message)
                reject()
            }
            
        })
    },
    create:(date,motif,user,patient) =>{
        console.log("Creating...")
        return new Promise(async (resolve, reject)=>{
            try{
                const pool = db.connect()
                const req = `INSERT INTO visite(date_visite,motif,utilisateur,client) 
                                VALUES($1,$2,$3,$4)  RETURNING id`
                const res =  await pool.query(req,[date,motif,user,patient])
                resolve(res)
            }catch(err){
                console.log(err.message)
                reject()
            }
        })
    },
    delete:(id) =>{
        return new Promise(async (resolve, reject)=>{
            try{
                const pool = db.connect()
                const req = `DELETE FROM visite WHERE id=$1`
                const res =  await pool.query(req,[id])
                resolve(res)
            }catch(err){
                console.log(err.message)
                reject()
            }
        })
    }
}
module.exports = visite