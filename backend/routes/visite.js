const express = require('express')
const winston = require('winston')
const visite = express.Router()
const Visite = require('../modules/Visite')
const auth = require('../middleware/auth')

visite.get('/:id', auth,(req,res)=>{
    
    let clientId = req.params.id
    if(clientId > 0){
        console.log("Find Visites by Client")
        Visite.find(clientId).then(data =>{
            console.log(data.rows)
            res.status(200).json(data.rows)
        })
    }else{
        console.log("Find All Visites")
        Visite.findAll().then(data =>{
            console.log(data.rows)
            res.status(200).json(data.rows)
        })
    }
    
})

visite.post('/',auth, (req,res)=>{
    console.log("Post New Visite")
    let date_visite = req.body.date_visite
    let motif = req.body.motif
    let utilisateur = req.body.utilisateur
    let client = req.body.client

    Visite.create(date_visite,motif,utilisateur,client).then(outcome =>{
            res.status(200).json(outcome.rows)
        })
})

module.exports = visite