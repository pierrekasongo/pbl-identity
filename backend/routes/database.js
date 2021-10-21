const express = require('express')
const winston = require('winston')
const router = express.Router()
const jwt = require('jsonwebtoken')

const Parameter = require('../modules/Database')
const conf = require('../config/conf')
const auth = require('../middleware/auth')
const dbscript = require('../utils/run_backup')


router.get('/', (req, res) => {
    console.log("Backup database...")
    let resp = dbscript.backup()
    if(resp)
        res.status(200).json({data:'true'})
    else
        res.status(201).json({data:'false'})
})

module.exports = router