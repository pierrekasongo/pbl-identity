var express = require('express')
const db = require('../utils/db')

const entreprise = {
    find:() =>{
        let res;
        try{
            const req = `SELECT * FROM entreprise`
            res =  db.query(req)
            return res
        }catch(err){
            console.log(err.message)
            return err
        }
    },
    create:(nom) =>{
        try{
            const req = `INSERT INTO entreprise(nom) VALUES(?)`
            const res =  db.query(req,[nom])
            return res
        }catch(err){
            console.log(err)
            return err
        }
    },
    delete:(id) =>{
        try{
            const req = `DELETE FROM entreprise WHERE id=?`
            const res =  db.query(req,[id])
            return res
        }catch(err){
            console.log(err.message)
            return err
        }
    },
    update:(id,nom) =>{
        try{
            const req = `UPDATE entreprise SET nom = ? WHERE id = ?`
            const res = db.query(req,[nom,id])
            return res
        }catch(err){
            console.log(err.message)
            return err
        }
    }
}
module.exports = entreprise