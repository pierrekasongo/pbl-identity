const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')

const app = express()

const clientRouter = require('./routes/client')
const familleRouter = require('./routes/famille')
const entrepriseRouter = require('./routes/entreprise')
const visiteRouter = require('./routes/visite')
const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.use(cookieParser())

app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))
app.use('/client', clientRouter)
app.use('/famille',familleRouter)
app.use('/entreprise', entrepriseRouter)
app.use('/visite', visiteRouter)
app.use('/user', userRouter)
app.use('/auth', authRouter)

app.listen(3000, () =>{
    console.log("Le serveur est à l'écoute")
})
