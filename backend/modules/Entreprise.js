var express = require('express')
const db = require('./db')

const entreprise = {

    find:() =>{
        return new Promise(async (resolve, reject)=>{
            let res;
            try{
                const pool = db.connect()
                const req = `SELECT * FROM entreprise`
                res =  await pool.query(req)
                resolve(res)
            }catch(err){
                console.log(err.message)
                reject()
            }
            
            
        })
    },
    create:(nom) =>{
        return new Promise(async (resolve, reject)=>{
            try{
                const pool = db.connect()
                const req = `INSERT INTO entreprise(nom) VALUES($1) RETURNING id`
                const res =  await pool.query(req,[nom])
                resolve(res)
            }catch(err){
                console.log(err)
                reject()
            }
            
        })
    },
    delete:(id) =>{
        return new Promise(async (resolve, reject)=>{
            try{
                const pool = db.connect()
                const req = `DELETE FROM entreprise WHERE id=$1`
                const res =  await pool.query(req,[id])
                resolve(res)
            }catch(err){
                console.log(err.message)
                reject
            }
        })
    },
    update:(id,nom) =>{
        return new Promise(async (resolve, reject)=>{
            try{
                const pool = db.connect()
                const req = `UPDATE entreprise SET nom = $2 WHERE id = $1`
                const res = await pool.query(req,[id,nom])
                resolve(res)
            }catch(err){
                console.log(err.message)
                reject()
            }
        })
    }
}
module.exports = entreprise