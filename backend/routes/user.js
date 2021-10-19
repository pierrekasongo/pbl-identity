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

router.get('/role',(req,res)=>{
    console.log("Get roles")
    console.log(conf.ROLE)
    res.status(200).json({data:conf.ROLE})
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

router.delete('/:id',auth,(req,res)=>{
    console.log("DELETE user")
    let id = req.params.id
    User.delete(id).then(outcome =>{
        console.log(outcome.rowCount)
        res.status(200).json({count:outcome.rowCount})
    })
})

router.put('/', auth,(req,res)=>{
    console.log("Edit user")
    let id = req.body.id
    let login = req.body.login
    let nom = req.body.nom || ''
    let role = req.body.role || ''
    let password = req.body.password || ''
    let status = req.body.status || ''

    if(password !== ''){
        //Updating the password
        console.log("Updating password")
        let _password = Utils.hash(password, login)
        User.updatePassword(id,_password).then(outcome =>{
            console.log("RESULT ",outcome.rowCount)
            res.status(200).json({count:outcome.rowCount})
        })
    }else if(status !==  ''){
        //Updating name or role
        console.log("Updating status")
        User.updateStatus(id,status).then(outcome =>{
            console.log("RESULT ",outcome.rowCount)
            res.status(200).json({count:outcome.rowCount})
        })
    }else{
        //Updating name or role
        console.log("Updating nom and/or role")
        User.update(id,nom,role).then(outcome =>{
            console.log("RESULT ",outcome.rowCount)
            res.status(200).json({count:outcome.rowCount})
        })
    }
    
})

router.get("/logout", function(req, res) {
    
});

module.exports = router