const express = require('express')
const winston = require('winston')
const multer = require('multer')
const fs = require('fs')
const upload = multer({dest:'public/uploads/'})
//const { client } = require('../modules/Client')
const client = express.Router()
const Client = require('../modules/Client')
const path = require('path')
const Utils = require('../modules/Utils')
const auth = require('../middleware/auth')


client.get('/', auth, (req,res)=>{
    console.log("Get all Clients")
    Client.findParents().then(data =>{
        res.status(200).json(data.rows)
    })
})

client.get('/:id',auth, (req,res)=>{
    console.log("Find by Id")
    let clientId = req.params.id
    
    Client.find(clientId).then(data =>{
        console.log(data.rows)
        res.status(200).json(data.rows[0])
    })
})

client.post('/upload',upload.single("file"), (req,res)=>{
    console.log("Uploading photo")
    let _filename = Utils.hash(req.body.client).substring(0,20)+path.extname(req.file.originalname)
    
    fs.renameSync(req.file.path, req.file.path.replace(req.file.filename,
        _filename))

    console.log("Filename ", _filename)

    Client.uploadPhoto(req.body.client, _filename).then(outcome =>{
            res.status(200).json({count: outcome.rowCount})
    })
})

client.post('/',auth, (req,res)=>{

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

client.put('/',auth, (req,res)=>{
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