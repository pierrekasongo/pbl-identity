const express = require('express')
const winston = require('winston')
const router = express.Router()
const Famille = require('../modules/Client')

router.get('/:id', (req,res) => {
    console.log("Find Famille by parent")
    let parentId = req.params.id
    
    Famille.findByParent(parentId).then(data =>{
        console.log(data.rows)
        res.status(200).json(data.rows)
    })
})

router.post('/', (req,res)=>{
    console.log("Create Famille")
    let prenom = req.body.prenom
    let nom = req.body.nom
    let postnom = req.body.postnom
    let sexe = req.body.sexe
    let date_naissance = req.body.date_naissance
    let photo = req.body.photo
    let localisation = req.body.localisation
    let parent = req.body.parent
    let relation = req.body.relation

    Famille.create(prenom,nom,postnom,sexe,date_naissance,photo,
        localisation,parent,relation).then(outcome =>{
            res.status(200).json(outcome.rows)
        })
})

module.exports = router