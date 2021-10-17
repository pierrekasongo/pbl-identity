const express = require('express')
const winston = require('winston')
const router = express.Router()
const Visite = require('../modules/Visite')
const auth = require('../middleware/auth')

router.get('/:id', auth,(req,res)=>{
    
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
router.post('/',auth, (req,res)=>{
    console.log("Post New Visite")
    let {date_visite, motif, utilisateur, patient} = req.body
 
    Visite.create(date_visite,motif,utilisateur,patient).then(outcome =>{
        console.log("Result ", outcome)
        res.status(200).json({count: outcome.rowCount})
    })
})
router.delete('/:id',auth,(req,res)=>{
    console.log("DELETE visite")
    let id = req.params.id
    Visite.delete(id).then(outcome =>{
        console.log(outcome.rowCount)
        res.status(200).json({count:outcome.rowCount})
    })
})

module.exports = router