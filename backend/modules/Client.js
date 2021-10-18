const express = require('express')
const winston = require('winston')
const db = require('./db')

const client = {

    find:(id) =>{
        return new Promise(async (resolve, reject)=>{
            try{
                const pool = db.connect()
                let req,res
                if(id){
                    req = `SELECT cl.id AS id, prenom, cl.nom AS nom, postnom,
                                sexe,TO_CHAR(cl.date_naissance, 'dd-mm-yyyy') AS date_naissance,photo,
                                localisation,num_id,ent.nom AS entreprise 
                                FROM client cl, entreprise ent
                                WHERE cl.entreprise = ent.id
                                AND parent = 0 OR parent = NULL
                                AND cl.id = $1`
                    res = await pool.query(req,[id])
                }else{
                    req = `SELECT cl.id AS id, prenom, cl.nom AS nom, postnom,
                            sexe,TO_CHAR(cl.date_naissance, 'dd-mm-yyyy') AS date_naissance,photo,
                            localisation,num_id,ent.nom AS entreprise 
                            FROM client cl, entreprise ent
                            WHERE cl.entreprise = ent.id
                            AND parent = 0 OR parent = NULL`
                    res = await pool.query(req)
                }
                resolve(res)
            }catch(err){
                console.log(err.message)
                reject()
            }
        })
    },
    findByName:(nom) =>{
        return new Promise(async (resolve, reject)=>{
            const pool = db.connect()
            const req = `SELECT * FROM client WHERE nom LIKE $1`
            const res =   await pool.query(req,[nom])
            resolve(res)
        })
    },
    findByParent:(parent) =>{
        return new Promise(async (resolve, reject)=>{
            try{
                const pool = db.connect()
                req = `SELECT id, prenom, nom, 
                        postnom,sexe,TO_CHAR(date_naissance, 'dd-mm-yyyy') AS date_naissance,photo,localisation,relation
                        FROM client WHERE parent = $1`
                const res =   await pool.query(req,[parent])
                resolve(res)
            }catch(err){
                console.log(err.message)
                reject()
            }
        })
    },
    findWithInclude:(parent) =>{
        return new Promise(async (resolve, reject)=>{
            try{
                const pool = db.connect()
                req = `SELECT id, prenom, nom, 
                        postnom,sexe,TO_CHAR(date_naissance, 'dd-mm-yyyy') AS date_naissance,photo,localisation,relation
                        FROM client WHERE parent = $1 
                        UNION 
                        SELECT id, prenom, nom, 
                        postnom,sexe,TO_CHAR(date_naissance, 'dd-mm-yyyy') AS date_naissance,photo,localisation,relation
                        FROM client WHERE id = $1`
                const res =   await pool.query(req,[parent])
                resolve(res)
            }catch(err){
                console.log(err.message)
                reject()
            }
        })
    },
    findParents:() =>{
        return new Promise(async (resolve, reject)=>{
            try{
                const pool = db.connect()
                const req = `SELECT cl.id AS id, prenom, cl.nom AS nom, postnom,sexe,
                                    TO_CHAR(cl.date_naissance, 'dd-mm-yyyy') AS date_naissance,photo,
                                    localisation,num_id,ent.id AS entreprise_id,ent.nom AS entreprise 
                                    FROM client cl, entreprise ent
                                    WHERE cl.entreprise = ent.id
                                    AND parent = 0 OR parent = NULL`
                const res =   await pool.query(req)
                resolve(res)
            }catch(err){
                console.log(err.message)
                reject()
            }
        })
    },
    findByCompany:(company) =>{
        return new Promise(async (resolve, reject)=>{
            const pool = db.connect()
            const req = `SELECT * FROM client WHERE entreprise = $1`
            const res= pool.query(req,[company])
            resolve(res)
        })
    },
    create:(prenom,nom,postnom,sexe,date_naissance,photo,localisation,
        num_id, entreprise,parent,relation) =>{
        return new Promise(async (resolve, reject)=>{
            try{
                const pool = db.connect()
                const req = `INSERT INTO client(prenom, nom, postnom,sexe,date_naissance,photo,
                    localisation,num_id,entreprise,parent,relation) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING id`
                const res =  await pool.query(req,[prenom,nom,postnom,sexe,date_naissance,
                    photo,localisation,num_id,entreprise,parent, relation])
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
            try{
                const pool = db.connect()
                const req = `DELETE FROM client WHERE id=$1`
                const res =  await pool.query(req,[id])
                resolve(res)
            }catch(err){
                console.log(err.message)
                reject()
            }
            
        })
    },
    update:(id,prenom,nom,postnom,sexe,date_naissance,localisation,
        num_id, entreprise) =>{
        return new Promise(async (resolve, reject)=>{
            try{
                const pool = db.connect()
                const req = `UPDATE client SET prenom = $2,nom=$3, postnom=$4,sexe=$5,date_naissance=$6,
                localisation=$7,num_id=$8,entreprise=$9 WHERE id = $1`
                const res =  await pool.query(req,[id,prenom,nom,postnom,sexe,date_naissance,localisation,
                    num_id, entreprise])
                resolve(res)
            }catch(err){
                console.log(err.message)
                reject()
            }
            
        })
    },
    uploadPhoto:(id,photo) =>{
        return new Promise(async (resolve, reject)=>{
            try{
                const pool = db.connect()
                const req = `UPDATE client SET photo = $2 WHERE id = $1`
                const res =  await pool.query(req,[id,photo])
                resolve(res)
            }catch(err){
                console.log(err.message)
                reject()
            }
            
        })
    }
}
module.exports = client