const express = require('express')
const winston = require('winston')
const db = require('./db')

const client = {

    find:(id) =>{
        return new Promise(async (resolve, reject)=>{
            const pool = db.connect()
            const req = `SELECT * FROM Client WHERE id = $1`
            const res = await pool.query(req,[id])
            resolve(res)
        })
    },
    findByName:(nom) =>{
        return new Promise(async (resolve, reject)=>{
            const pool = db.connect()
            const req = `SELECT * FROM Client WHERE nom LIKE $1`
            const res =   await pool.query(req,[nom])
            resolve(res)
        })
    },
    findByParent:(parent) =>{
        return new Promise(async (resolve, reject)=>{
            const pool = db.connect()
            const req = `SELECT * FROM Client WHERE parent = $1`
            const res =   await pool.query(req,[parent])
            resolve(res)
        })
    },
    findParents:() =>{
        return new Promise(async (resolve, reject)=>{
            const pool = db.connect()
            const req = `SELECT * FROM Client WHERE parent = 0`
            const res =   await pool.query(req)
            resolve(res)
        })
    },
    findByCompany:(company) =>{
        return new Promise(async (resolve, reject)=>{
            const pool = db.connect()
            const req = `SELECT * FROM Client WHERE entreprise = $1`
            const res= pool.query(req,[company])
            resolve(res)
        })
    },
    createParent:(prenom,nom,postnom,sexe,date_naissance,photo,localisation,
        num_id, entreprise) =>{
        return new Promise(async (resolve, reject)=>{
            try{
                const pool = db.connect()
                const req = `INSERT INTO client(prenom, nom, postnom,sexe,date_naissance,photo,
                    localisation,num_id,entreprise) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) 
                    RETURNING id`
                const res =  await pool.query(req,[prenom,nom,postnom,sexe,date_naissance,
                    photo,localisation,num_id,entreprise])
                resolve(res)
            }catch(err){
                winston.error(err.message)
                reject()
            }
            
        })
    },
    createChild:(prenom,nom,postnom,sexe,date_naissance,photo,parent,relation) =>{
        return new Promise(async (resolve, reject)=>{
            try{
                const pool = db.connect()
                const req = `INSERT INTO client(prenom, nom, postnom,sexe,date_naissance,photo,
                    ,parent,relation) VALUES($1,$2,$3,$4,$5,$6,$7,$8) 
                    RETURNING id`
                const res =  await pool.query(req,[prenom,nom,postnom,sexe,date_naissance,
                    photo,parent,relation])
                resolve(res)
            }catch(err){
                winston.error(err.message)
                reject()
            }
            
        })
    },
    delete:(id) =>{
        return new Promise(async (resolve, reject)=>{
            const pool = db.connect()
            const req = `DELETE FROM Client WHERE id=$1`
            const res =  await pool.query(req,[id])
            resolve(res)
        })
    },
    updateParent:(id,prenom,nom,postnom,sexe,date_naissance,photo,localisation,
        num_id, entreprise,parent,relation) =>{
        return new Promise(async (resolve, reject)=>{
            const pool = db.connect()
            const req = `UPDATE Client SET prenom = $2,nom=$3, postnom=$4,sexe=$5,date_naissance=$6,photo=$7,
            localisation=$8,num_id=$9,entreprise=$10,parent=$11,relation=$12 WHERE id = $1`
            const res =  await pool.query(req,[id,nom])
            resolve(res)
        })
    },
    updateChild:(id,prenom,nom,postnom,sexe,date_naissance,photo,relation) =>{
        return new Promise(async (resolve, reject)=>{
            const pool = db.connect()
            const req = `UPDATE Client SET prenom = $2,nom=$3, postnom=$4,sexe=$5,
                date_naissance=$6,photo=$7,relation=$8 WHERE id = $1`
            const res =  await pool.query(req,[id,nom,postnom,sexe,date_naissance,photo,relation])
            resolve(res)
        })
    }
}
module.exports = client