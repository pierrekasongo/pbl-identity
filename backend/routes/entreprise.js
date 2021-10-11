const express = require('express')
const winston = require('winston')
const router = express.Router()
const Entreprise = require('../modules/Entreprise')

router.get('/', (req,res)=>{
    console.log("Get all entreprise")
    Entreprise.find().then(data =>{
        console.log(data.rows)
        res.status(200).send(data.rows)
    })
})

router.get('/find?id', (req,res)=>{

  let id = req.params.id
    
  Entreprise.find(id).then(data =>{
            console.log(data)
            res.status(200).json(data)
        })
})

router.put('/', (req,res)=>{
    console.log("Edit entreprise")
    let id = req.body.id
    let nom = req.body.nom

    Entreprise.update(id,nom).then(outcome =>{
        console.log("RESULT ",outcome.rowCount)
        res.status(200).json({count:outcome.rowCount})
    })
})
router.post('/', (req,res)=>{
    console.log("Post new entreprise")
    let nom = req.body.nom
    Entreprise.create(nom,).then(outcome =>{
        console.log(outcome.rows[0])
        res.status(200).json(outcome.rows[0])
    })
})
router.delete('/:id', (req,res)=>{
    console.log("DELETE entreprise")
    let id = req.params.id
    Entreprise.delete(id).then(outcome =>{
        console.log(outcome.rowCount)
        res.status(200).json({count:outcome.rowCount})
    })
})
module.exports = router