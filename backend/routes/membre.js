const express = require('express')
const winston = require('winston')
//const { client } = require('../modules/Client')
const client = express.Router()
const Client = require('../modules/Client')
const auth = require('../middleware/auth')

client.get('/find?id',auth,(req,res)=>{

  let id = req.params.id
    
    Client.find(id).then(data =>{
            console.log(data)
            res.status(200).json(data)
        })
})
client.post('/',auth, (req,res)=>{

    let prenom = req.body.prenom
    let nom = req.body.nom
    let postnom = req.body.postnom
    let sexe = req.body.sexe
    let date_naissance = req.body.date_naissance
    let photo = req.body.photo
    let localisation = req.body.localisation
    let num_id = req.body.num_id
    let entreprise = req.body.entreprise
    let parent = req.body.parent
    let relation = req.body.relation

    Client.create(prenom,nom,postnom,sexe,date_naissance,photo,
        localisation,num_id,entreprise,parent,relation).then(outcome =>{
            res.status(200).json(outcome.rows)
        })
})

module.exports = client