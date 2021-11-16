const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()

const clientRouter = require('./routes/client')
const familleRouter = require('./routes/famille')
const entrepriseRouter = require('./routes/entreprise')
const visiteRouter = require('./routes/visite')
const userRouter = require('./routes/user')
const relationRouter = require('./routes/relation')
const databaseRouter = require('./routes/database')

app.use(express.urlencoded({ extended: true }))
//app.use(bodyParser.json());
app.use(express.json())

app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/client', clientRouter)
app.use('/famille', familleRouter)
app.use('/entreprise', entrepriseRouter)
app.use('/visite', visiteRouter)
app.use('/user', userRouter)
app.use('/relation', relationRouter)
app.use('/database', databaseRouter)

app.listen(3000, () => {
    console.log("Le serveur est à l'écoute")
    /*const url = 'http://localhost:3000';
    const start = (process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open');
    require('child_process').exec(start + ' ' + url);*/
})

/**
 * https://www.section.io/engineering-education/compile-your-nodejs-application-into-a-exe-file/
 * nexe app.js
 * nexe --build
 */