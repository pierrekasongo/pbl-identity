const express = require('express')
const winston = require('winston')
const router = express.Router()
const Famille = require('../modules/Client')
const auth = require('../middleware/auth')

router.get('/:id/:include', auth,(req,res) => {
    console.log("Find Famille by parent")
    let parentId = req.params.id
    let include = req.params.include

    if(include == 0)
    {
        console.log("WITHOUT INCLUDE")
        Famille.findByParent(parentId).then(data =>{
            console.log(data.rows)
            res.status(200).json(data.rows)
        })
    }else{
        console.log("WITH INCLUDE")
        Famille.findWithInclude(parentId).then(data =>{
            console.log(data.rows)
            res.status(200).json(data.rows)
        })
    }
    
})

module.exports = router