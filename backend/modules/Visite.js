var express = require('express')
var conf = require('../config/conf')

const visite = {

    find:(id) =>{
        return new Promise(async (resolve, reject)=>{
            try{
                const pool = db.connect()
                const req = `SELECT * FROM Visite WHERE id = $1`
                const res =  await pool.query(req,[id])
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
                const req = `SELECT * FROM Visite WHERE utilisateur = $1`
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
                const req = `SELECT * FROM Visite WHERE date_visite = $1`
                const res =  await pool.query(req,[date])
                resolve(res)
            }catch(err){
                console.log(err.message)
                reject()
            }
            
        })
    },
    create:(date,motif,user) =>{
        return new Promise(async (resolve, reject)=>{
            try{
                const pool = db.connect()
                const req = `INSERT INTO Visite(date_visite,motif,utilisateur) VALUES($1,$2,$3)`
                const res =  await pool.query(req,[date,motif,user])
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
                const req = `DELETE FROM Visite WHERE id=$1`
                const res =  await pool.query(text,[id])
                resolve(res)
            }catch(err){
                console.log(err.message)
                reject()
            }
        })
    }
}
module.exports = visite