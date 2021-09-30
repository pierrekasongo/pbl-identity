const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const app = express()

const clientRouter = require('./routes/client')
const entrepriseRouter = require('./routes/entreprise')
const visiteRouter = require('./routes/visite')
const userRouter = require('./routes/user')
const membreRouter = require('./routes/membre')

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')))
app.use('/client', clientRouter)
app.use('/entreprise', entrepriseRouter)
app.use('/visite', visiteRouter)
app.use('user', userRouter)
app.use('membre',membreRouter)

app.listen(3000, () =>{
    console.log("Le serveur est à l'écoute")
})
