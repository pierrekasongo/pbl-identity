const express = require('express')
const winston = require('winston')
const ent = express.Router()
const Entreprise = require('../modules/Entreprise')

ent.get('/', (req,res)=>{
    console.log("Get all entreprise")
    Entreprise.find().then(data =>{
              res.status(200).json(data.rows)
    })
  })

  ent.get('/find?id', (req,res)=>{

  let id = req.params.id
    
  Entreprise.find(id).then(data =>{
            console.log(data)
            res.status(200).json(data)
        })
})

ent.post('/', (req,res)=>{

    let nom = req.body.nom

    Entreprise.create(nom,).then(outcome =>{
        res.status(200).json(outcome.rows)
    })
})
module.exports = ent