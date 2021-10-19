var express = require('express')
const crypto = require('crypto')
const db = require('./db')
const Utils = require('./Utils')
const user = {

    find:() =>{
        return new Promise(async (resolve, reject)=>{
            let res;
            try{
                const pool = db.connect()
                const req = `SELECT id,login,nom,role,status FROM utilisateur`
                res =  await pool.query(req)
                resolve(res)
            }catch(err){
                console.log(err.message)
                reject()
            } 
        })
    },
    findByLogin:(login) =>{
        return new Promise(async (resolve, reject)=>{
            let res;
            try{
                const pool = db.connect()
                const req = `SELECT id,login,nom,role FROM utilisateur WHERE login = $1 AND status= $2 `
                res =  await pool.query(req,[login,'Actif'])
                resolve(res)
            }catch(err){
                console.log(err.message)
                reject()
            } 
        })
    },
    login:(login, password) =>{
        return new Promise(async (resolve, reject)=>{
            try{
                const pool = db.connect()
                const req = `SELECT * FROM utilisateur WHERE login = $1 AND password = $2 AND status = $3`
                const res =  await pool.query(req,[login,password,'Actif'])
                resolve(res)
            }catch(err){
                console.log(err.message)
                reject()
            }
            
            
        })
    },
    create:(login,nom,password,role) =>{
        return new Promise(async (resolve, reject)=>{
            try{
                const pool = db.connect()
                const req = `INSERT INTO utilisateur(login,nom,password,role,status) VALUES($1,$2,$3,$4,$5)`
                const res =  await pool.query(req,[login,nom,password,role,'Actif'])
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
                const req = `DELETE FROM utilisateur WHERE id=$1`
                const res =  await pool.query(req,[id])
                resolve(res)
            }catch(err){
                console.log(err.message)
                reject()
            }
            
        })
    },
    update:(id,nom,role) =>{
        return new Promise(async (resolve, reject)=>{
            try{
                const pool = db.connect()
                const req = `UPDATE utilisateur SET nom = $2 role = $3, WHERE id = $1`
                const res =  await pool.query(req,[id,nom,role])
                resolve(res)
            }catch(err){
                console.log(err.message)
                reject()
            }
            
        })
    },
    updateStatus:(id,status) =>{
        return new Promise(async (resolve, reject)=>{
            try{
                const pool = db.connect()
                const req = `UPDATE utilisateur SET status = $2 WHERE id = $1`
                const res =  await pool.query(req,[id,status])
                resolve(res)
            }catch(err){
                console.log(err.message)
                reject()
            }
            
        })
    },
    updatePassword:(id,password) =>{
        return new Promise(async (resolve, reject)=>{
            try{
                const pool = db.connect()
                const req = `UPDATE utilisateur SET password = $2 WHERE id = $1`
                const res =  await pool.query(req,[id,password])
                resolve(res)
            }catch(err){
                console.log(err.message)
                reject()
            }
        })
    }
}
module.exports = user