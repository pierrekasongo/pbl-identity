const express = require('express')
const winston = require('winston')
const router = express.Router()
const User = require('../modules/User')

router.get('/', (req,res)=>{

  console.log("Get all Users")
  User.find().then(data =>{
        console.log(data.rows)
        res.status(200).json(data.rows)
    })
   
})

router.post('/', (req,res)=>{
    console.log("POST new User")
    let login = req.body.login
    let nom = req.body.nom
    let password = req.body.password
    let role = req.body.role

    let _password = User.hashPassword(password, login)
   
    User.create(login,nom,_password.hash,role).then(data =>{
        res.status(200).json(data.rows)
    })
})

module.exports = router