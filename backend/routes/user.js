const express = require('express')
const winston = require('winston')
const router = express.Router()
const jwt = require('jsonwebtoken')

const User = require('../modules/User')
const Utils = require('../modules/Utils')
const conf = require('../config/conf')
const auth = require('../middleware/auth')

router.get('/', auth,(req,res)=>{

  console.log("Get all Users")
  User.find().then(data =>{
        console.log(data.rows)
        res.status(200).json(data.rows)
    })
})

router.post('/',auth, (req,res)=>{
    console.log("POST new User")
    const {login,nom,password,role} = req.body
    //Check if login exist
    User.findByLogin(login).then(data =>{
        let user = data.rows[0]
        if(user) 
            res.status(409).send("Le login existe déjà dans le système");
    })

    let _password = Utils.hash(password, login)
   
    User.create(login,nom,_password,role).then(data =>{
        res.status(200).json(data.rows)
    })
})

router.post('/auth',(req,res)=>{
    console.log("Authenticate a user")
    const {login, password} = req.body

    let _password = Utils.hash(password, login)
   
    User.login(login,_password).then(data =>{
        console.log("Response ",data.rows[0])
        const _user = data.rows[0]
        //Create token
        const token = jwt.sign(
            { user_id: _user.id, login },
            conf.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
        )
        const user = {
            id: _user.id,
            login: _user.login,
            nom: _user.nom,
            role: _user.role,
            token: token
        }
        res.status(200).json(user)
    })
})

router.get("/logout", function(req, res) {
    
});

module.exports = router