var express = require('express')

const user = {

    find:() =>{
        return new Promise(async (resolve, reject)=>{
            let res;
            try{
                const pool = db.connect()
                const req = `SELECT * FROM user`
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
            try{
                const pool = db.connect()
                const req = `SELECT * FROM user WHERE login = $1`
                const res =  await pool.query(req,[login])
                resolve(res)
            }catch(err){
                console.log(err.message)
                reject()
            }
            
            
        })
    },
    create:(login,nom,password) =>{
        return new Promise(async (resolve, reject)=>{
            try{
                const pool = db.connect()
                const req = `INSERT INTO user(login,nom,password) VALUES($1,$2,$3)`
                const res =  await pool.query(req,[login,nom,password])
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
                const req = `DELETE FROM user WHERE id=$1`
                const res =  await pool.query(req,[id])
                resolve(res)
            }catch(err){
                console.log(err.message)
                reject()
            }
            
        })
    },
    update:(id,nom) =>{
        return new Promise(async (resolve, reject)=>{
            try{
                const pool = db.connect()
                const req = `UPDATE user SET nom = $2 WHERE id = $1`
                const res =  await pool.query(req,[id,nom])
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
                const req = `UPDATE user SET password = $2 WHERE id = $1`
                const res =  await pool.query(text,[id,password])
                resolve(res)
            }catch(err){
                console.log(err.message)
                reject()
            }
        })
    }
}
module.exports = user