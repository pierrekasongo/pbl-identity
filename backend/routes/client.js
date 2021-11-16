const express = require('express')
const winston = require('winston')
const multer = require('multer')
const fs = require('fs')
const conf = require('../config/conf')
const upload = multer({ dest: __dirname + "/../" + conf.UPLOADS_PATH })
//const { client } = require('../modules/Client')
const router = express.Router()
const Client = require('../modules/Client')
const path = require('path')
const Utils = require('../utils/Utils')
const auth = require('../middleware/auth')

router.get('/', auth, (req, res) => {
    console.log("Get all Clients")
    Client.findParents().then(data => {
        console.log("Client ", data)
        res.status(200).json(data)
    })
})

router.get('/:id', auth, (req, res) => {
    console.log("Find by Id")
    let clientId = req.params.id
    Client.find(clientId).then(data => {
        console.log("Client ", data)
        res.status(200).json(data[0])
    })
})

router.get('/by_entreprise/:entreprise_id', auth, (req, res) => {
    console.log("Get clients by company ", req.params.entreprise_id)
    const entreprise_id = req.params.entreprise_id
    Client.findByCompany(entreprise_id).then(data => {
        console.log("Client ", data)
        res.status(200).json(data)
    })
})

router.post('/upload', upload.single("file"), (req, res, next) => {

    console.log("Uploading photo at ", __dirname + "/../" + conf.UPLOADS_PATH)
            let _filename = Utils.hash(req.body.client).substring(0, 20) + path.extname(req.file.originalname)

    Client.uploadPhoto(req.body.client, _filename).then(data => {

        console.log("Client ", data)

        if (fs.existsSync(__dirname + "/../" + conf.UPLOADS_PATH+"/"+_filename)) {
            fs.unlinkSync(__dirname + "/../" + conf.UPLOADS_PATH+"/"+_filename)

        }
       
        if (data.affectedRows > 0) {
            fs.renameSync(req.file.path, req.file.path.replace(req.file.filename,
                _filename))

            console.log("Filename ", _filename)

            res.status(200).json({ count: data.affectedRows })
        }else{
            res.status(200).json({ count: 0 })
        }
        
    })
})

router.get('/relation', (req, res) => {
    console.log("Get relations")
    res.status(200).json({ data: conf.RELATION })
})

router.post('/', auth, (req, res) => {
    console.log("POSTING")
    let prenom = req.body.prenom
    let nom = req.body.nom
    let postnom = req.body.postnom
    let sexe = req.body.sexe
    let date_naissance = req.body.date_naissance
    let localisation = req.body.localisation
    let photo = ""
    let num_id = req.body.matricule || null
    let num_dossier = req.body.num_dossier
    let entreprise = req.body.entreprise || null
    let parent = req.body.parent || 0
    let relation = req.body.relation || "Agent"
    Client.create(prenom, nom, postnom, sexe, date_naissance, photo,
        localisation, num_id, num_dossier, entreprise, parent, relation)
        .then(data => {
            res.status(200).json({ count: data.affectedRows })
        })
})

router.put('/', auth, (req, res) => {
    console.log("/PUT client")
    let id = req.body.id
    let prenom = req.body.prenom
    let nom = req.body.nom
    let postnom = req.body.postnom
    let sexe = req.body.sexe
    let date_naissance = req.body.date_naissance
    let localisation = req.body.localisation
    let num_id = req.body.matricule || null
    let num_dossier = req.body.num_dossier
    let entreprise = req.body.entreprise || null

    Client.update(id, prenom, nom, postnom, sexe, date_naissance,
        localisation, num_id, num_dossier, entreprise)
        .then(data => {
            res.status(200).json({ count: data.affectedRows })
        })

})

router.delete('/:id', auth, (req, res) => {
    console.log("DELETE client")
    let id = req.params.id
    Client.delete(id)
        .then(data => {
            res.status(200).json({ count: outcome.affectedRows })
        })
})

module.exports = router