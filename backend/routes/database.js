const express = require('express')
const winston = require('winston')
const router = express.Router()
const jwt = require('jsonwebtoken')
const path = require('path')
const fs = require('fs')
const Database = require('../modules/Database')
const auth = require('../middleware/auth')
const conf = require('../config/conf')

router.post('/', auth, (req, res) => {
    let { filename } = req.body || ''
    if (filename === '') {
        console.log("Backup database...")
        let rp = Database.dump()
        res.status(200).json({
            success: true,
            filename: rp.filename
        })
    } else {
        console.log("Restoring file")
        let rp = Database.restore(filename)
        console.log("RP ", rp)

        res.status(200).json({
            success: true,
            filename: rp.filename
        })
    }
})

router.get('/', auth, (req, res) => {
    console.log("List all dispatches...")
    let files = []
    fs.readdir(conf.DISPATCH_PATH, function (err, _files) {
        if (err) {
            console.log("Unable to scan directory: " + err)
            return null
        }
        _files.forEach(function (file) {
            console.log(file)
            files.push({ nom: file })
        })
        res.status(200).json(files)
    })
})

module.exports = router