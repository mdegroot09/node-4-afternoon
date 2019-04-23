const express = require('express')
const session = require('express-session')
require('dotenv').config()
const {SERVER_PORT, SESSION_SECRET} = process.env
const checkForSession = require('./middlewares/checkForSession')
const swagController = require('./controllers/swagController')
const authController = require('./controllers/authController')
const cartController = require('./controllers/cartController')

const app = express()

app.use(express.json())
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(checkForSession)

// swag controller
app.get('/api/swag', swagController.read)

// auth controller
app.post('/api/register', authController.register)
app.post('/api/login', authController.login)
app.post('/api/signout', authController.signout)
app.get('/api/user', authController.getUser)

// cart controller
app.post('/api/cart/checkout', cartController.checkout)
app.post('/api/cart/:id', cartController.add)
app.delete('/api/cart/:id', cartController.delete)

app.listen(SERVER_PORT, () => {
  console.log('Listening on port:', SERVER_PORT)
})