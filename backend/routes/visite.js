const express = require('express')
const winston = require('winston')
const router = express.Router()
const Visite = require('../modules/Visite')
const auth = require('../middleware/auth')

router.get('/:id', auth,(req,res)=>{
    
    let clientId = req.params.id
    let data
    if(clientId > 0){
        console.log("Find Visites by Client")
        data = Visite.find(clientId)
        res.status(200).json(data.values)
    }else{
        console.log("Find All Visites")
        data = Visite.findAll()
        res.status(200).json(data.values)
    }
    
})
router.post('/',auth, (req,res)=>{
    console.log("Post New Visite")
    let {date_visite, motif, utilisateur, patient} = req.body
 
    const data = Visite.create(date_visite,motif,utilisateur,patient)

    res.status(200).json({count: data.affectedRows})
})
router.delete('/:id',auth,(req,res)=>{
    console.log("DELETE visite")
    let id = req.params.id
    const data = Visite.delete(id)

    res.status(200).json({count:data.affectedRows})
})

module.exports = router