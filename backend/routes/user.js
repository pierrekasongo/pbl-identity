const express = require('express')
const winston = require('winston')
const router = express.Router()
const jwt = require('jsonwebtoken')

const User = require('../modules/User')
const Utils = require('../utils/Utils')
const conf = require('../config/conf')
const auth = require('../middleware/auth')


router.get('/', auth,(req, res) => {

    console.log("Get all Users")
    const data = User.find()
    console.log(data.values)
    res.status(200).json(data.values)
})

router.get('/role', (req, res) => {
    console.log("Get roles")
    console.log(conf.ROLE)
    res.status(200).json({ data: conf.ROLE })
})

router.post('/', auth, (req, res) => {
    console.log("POST new User")
    const { login, nom, role } = req.body
    //Check if login exist
    User.findByLogin(login).then(data => {
        let user = data.rows[0]
        if (user)
            res.status(409).send("Le login existe déjà dans le système");
    })
    User.create(login, nom, role).then(data => {
        res.status(200).json({ count: data.rowCount })
    })
})

router.post('/auth',  (req, res) => {
    console.log("Authenticate a user")
    const login = req.body.login
    const password = req.body.password
    const checkPass = req.body.checkPass || false

    let _password = Utils.hash(password, login)
    let data
    User.login(login, _password).then(data =>{
        console.log("Resp ",data)
        const _user = data[0]
        console.log("_user ",_user)
        let token = ''
        //Create token
        if (!checkPass && _user != undefined) {
            console.log("Creating token...")
            token = jwt.sign(
                { user_id: _user.id, login },
                conf.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            )
        }
        let user
        if (_user) {
            user = {
                id: _user.id,
                login: _user.login,
                nom: _user.nom,
                role: _user.role,
                token: token
            }
        }
        console.log(user)
        res.status(200).json(user)
    })
    
})

router.delete('/:id', auth, (req, res) => {
    console.log("DELETE user")
    let id = req.params.id
    const data = User.delete(id)
    res.status(200).json({ count: data.affectedRows })
})

router.put('/', (req, res) => {
    console.log("Edit user")
    let id = req.body.id
    let login = req.body.login
    let nom = req.body.nom || ''
    let role = req.body.role || ''
    let password = req.body.password || ''
    let status = req.body.status || ''

    console.log(req.body)
    let data
    if (password !== '') {
        //Updating the password
        console.log("Updating password")
        console.log(login, password)
        let _password = Utils.hash(password, login)
        console.log(_password)
        data = User.updatePassword(id, _password)
        res.status(200).json({ count: data.affectedRows })
    } else if (status !== '') {
        //Updating name or role
        console.log("Updating status")
        data = User.updateStatus(id, status)
        res.status(200).json({ count: data.affectedRows })
    } else {
        //Updating name or role
        console.log("Updating nom and/or role")
        console.log(id, nom, role)
        data = User.update(id, nom, role)
        res.status(200).json({ count: data.affectedRows })
    }

})

router.get("/logout", function (req, res) {

});

module.exports = router