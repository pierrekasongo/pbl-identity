const express = require('express')
const winston = require('winston')
const router = express.Router()
const auth = require('../middleware/auth')
const conf = require('../config/conf')

router.get('/',auth,(req,res)=>{
    console.log("Get relations")
    console.log("Relations ",conf.RELATION)
    //res.send(conf.RELATION)
    res.status(200).json({data:conf.RELATION})
})

module.exports = router