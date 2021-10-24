const express = require('express')
const winston = require('winston')
const router = express.Router()
const Entreprise = require('../modules/Entreprise')
const auth = require('../middleware/auth')

router.get('/',auth,(req,res)=>{
    console.log("Get all entreprise")
    Entreprise.find().then(data =>{
        res.status(200).json(data) 
     })
})

router.get('/find?id',auth, (req,res)=>{

  let id = req.params.id
    
  Entreprise.find(id).then(data =>{
    res.status(200).json(data) 
 })
})

router.put('/', auth,(req,res)=>{
    console.log("Edit entreprise")
    let id = req.body.id
    let nom = req.body.nom

    Entreprise.update(id,nom).then(data =>{
        res.status(200).json({count:data.affectedRows})
     })
    
})
router.post('/',auth, (req,res)=>{
    console.log("Post new entreprise")
    let nom = req.body.nom
    Entreprise.create(nom).then(data =>{
        res.status(200).json({count:data.affectedRows})
     })
})
router.delete('/:id',auth,(req,res)=>{
    console.log("DELETE entreprise")
    let id = req.params.id
    Entreprise.delete(id).then(data =>{
        res.status(200).json({count:data.affectedRows})
     })
})
module.exports = router