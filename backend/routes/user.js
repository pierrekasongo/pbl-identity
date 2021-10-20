const express = require('express')
const winston = require('winston')
const router = express.Router()
const jwt = require('jsonwebtoken')

const User = require('../modules/User')
const Utils = require('../modules/Utils')
const conf = require('../config/conf')
const auth = require('../middleware/auth')


router.get('/', auth, (req, res) => {

    console.log("Get all Users")
    User.find().then(data => {
        console.log(data.rows)
        res.status(200).json(data.rows)
    })
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

router.post('/auth', (req, res) => {
    console.log("Authenticate a user")
    const login = req.body.login
    const password = req.body.password
    const checkPass = req.body.checkPass || false

    let _password = Utils.hash(password, login)

    User.login(login, _password).then(data => {
        console.log("Response ", data.rows[0])
        const _user = data.rows[0]
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
        res.status(200).json(user)
    })
})

router.delete('/:id', auth, (req, res) => {
    console.log("DELETE user")
    let id = req.params.id
    User.delete(id).then(outcome => {
        console.log(outcome.rowCount)
        res.status(200).json({ count: outcome.rowCount })
    })
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

    if (password !== '') {
        //Updating the password
        console.log("Updating password")
        console.log(login, password)
        let _password = Utils.hash(password, login)
        console.log(_password)
        User.updatePassword(id, _password).then(outcome => {
            console.log("RESULT ", outcome.rowCount)
            res.status(200).json({ count: outcome.rowCount })
        })
    } else if (status !== '') {
        //Updating name or role
        console.log("Updating status")
        User.updateStatus(id, status).then(outcome => {
            console.log("RESULT ", outcome.rowCount)
            res.status(200).json({ count: outcome.rowCount })
        })
    } else {
        //Updating name or role
        console.log("Updating nom and/or role")
        console.log(id, nom, role)
        User.update(id, nom, role).then(outcome => {
            console.log("RESULT ", outcome.rowCount)
            res.status(200).json({ count: outcome.rowCount })
        })
    }

})

router.get("/logout", function (req, res) {

});

module.exports = router