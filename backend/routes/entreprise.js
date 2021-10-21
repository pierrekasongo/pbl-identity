const express = require('express')
const winston = require('winston')
const router = express.Router()
const Entreprise = require('../modules/Entreprise')
const auth = require('../middleware/auth')

router.get('/',auth,(req,res)=>{
    console.log("Get all entreprise")
    const data = Entreprise.find()
    console.log(data.values)
    res.status(200).send(data.values)
})

router.get('/find?id',auth, (req,res)=>{

  let id = req.params.id
    
  const data = Entreprise.find(id)
  res.status(200).json(data.values)
})

router.put('/', auth,(req,res)=>{
    console.log("Edit entreprise")
    let id = req.body.id
    let nom = req.body.nom

    const data = Entreprise.update(id,nom)
    res.status(200).json({count:data.affectedRows})
})
router.post('/',auth, (req,res)=>{
    console.log("Post new entreprise")
    let nom = req.body.nom
    const data = Entreprise.create(nom,)
    res.status(200).json(data.affectedRows)
})
router.delete('/:id',auth,(req,res)=>{
    console.log("DELETE entreprise")
    let id = req.params.id
    const data = Entreprise.delete(id).

    res.status(200).json({count:data.affectedRows})
})
module.exports = router