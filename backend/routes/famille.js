const express = require('express')
const winston = require('winston')
const router = express.Router()
const Famille = require('../modules/Client')
const auth = require('../middleware/auth')


router.get('/:id', auth,(req,res) => {
    console.log("Find Famille member by ID")
    let id = req.params.id

    Famille.findMemberByID(id).then(data =>{
        res.status(200).json(data[0])
     })
})

router.get('/:id/:include', auth,(req,res) => {
    console.log("Find Famille by parent")
    let parentId = req.params.id
    let include = req.params.include
    let data
    if(include == 0)
    {
        console.log("WITHOUT INCLUDE")
        Famille.findByParent(parentId).then(data =>{
            res.status(200).json(data)
         })
    }else{
        console.log("WITH INCLUDE")
        Famille.findWithInclude(parentId).then(data =>{
            res.status(200).json(data)
        })
    }
    
})

module.exports = router