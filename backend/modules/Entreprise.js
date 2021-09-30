var express = require('express')
const db = require('./db')

const entreprise = {

    find:(id) =>{
        return new Promise(async (resolve, reject)=>{
            let res;
            try{
                const pool = db.connect()
                if(id){
                    const req = `SELECT * FROM entreprise WHERE id = $1`
                    res =  await pool.query(req,[id])
                }else{
                    res =  await pool.query("SELECT * FROM entreprise")
                }
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
                const req = `INSERT INTO entreprise(nom) VALUES($1)`
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
            const pool = db.connect()
            const req = `DELETE FROM entreprise WHERE id=$1`
            return  await pool.query(text,[id])
        })
    },
    update:(id,nom) =>{
        return new Promise(async (resolve, reject)=>{
            const pool = db.connect()
            const req = `UPDATE entreprise SET nom = $2 WHERE id = $1`
            return  await pool.query(text,[id,nom])
        })
    }
}
module.exports = entreprise