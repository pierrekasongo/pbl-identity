const express = require('express')
const winston = require('winston')
const router = express.Router()
const Famille = require('../modules/Client')
const auth = require('../middleware/auth')

router.get('/:id/:include', auth,(req,res) => {
    console.log("Find Famille by parent")
    let parentId = req.params.id
    let include = req.params.include
    let data
    if(include == 0)
    {
        console.log("WITHOUT INCLUDE")
        data = Famille.findByParent(parentId).

        res.status(200).json(data.values)
    }else{
        console.log("WITH INCLUDE")
        data = Famille.findWithInclude(parentId)

        res.status(200).json(data.values)
    }
    
})

module.exports = router