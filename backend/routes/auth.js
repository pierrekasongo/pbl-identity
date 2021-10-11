const express = require('express')
const winston = require('winston')
const router = express.Router()
const User = require('../modules/User')

router.post('/', (req,res)=>{
    console.log("Authenticate a user")
    let login = req.body.login
    let password = req.body.password

    console.log(login,password)

    let _password = User.hashPassword(password, login)
   
    User.login(login,_password.hash).then(data =>{
        console.log(data.rows[0])
        res.status(200).json(data.rows[0])
    })
})

module.exports = router