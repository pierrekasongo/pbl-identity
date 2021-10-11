const express = require('express')
const winston = require('winston')
//const { client } = require('../modules/Client')
const client = express.Router()
const Client = require('../modules/Client')


client.get('/', (req,res)=>{
    console.log("Get all Clients")
    Client.findParents().then(data =>{
        res.status(200).json(data.rows)
    })
})

client.get('/:id', (req,res)=>{
    console.log("Find by Id")
    let clientId = req.params.id
    
    Client.find(clientId).then(data =>{
        console.log(data.rows)
        res.status(200).json(data.rows[0])
    })
})


client.post('/', (req,res)=>{

    let prenom = req.body.prenom
    let nom = req.body.nom
    let postnom = req.body.postnom
    let sexe = req.body.sexe
    let date_naissance = req.body.date_naissance
    let localisation = req.body.localisation
    let photo = ""
    let num_id = req.body.matricule
    let entreprise = req.body.entreprise
    let parent = 0
    let relation = "Agent"
    Client.createParent(prenom,nom,postnom,sexe,date_naissance,photo,
        localisation,num_id,entreprise,parent,relation).then(outcome =>{
            res.status(200).json({count: outcome.rowCount})
        })
})

client.put('/', (req,res)=>{
    console.log("/PUT client")
    let id = req.body.id
    let prenom = req.body.prenom
    let nom = req.body.nom
    let postnom = req.body.postnom
    let sexe = req.body.sexe
    let date_naissance = req.body.date_naissance
    let localisation = req.body.localisation
    let num_id = req.body.matricule
    let entreprise = req.body.entreprise

    Client.updateParent(id,prenom,nom,postnom,sexe,date_naissance,
                            localisation,num_id,entreprise)
                            .then(outcome =>{
            res.status(200).json({count: outcome.rowCount})
        })
})

module.exports = client