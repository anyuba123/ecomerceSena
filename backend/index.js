const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')
const authToken = require('./middleware/authToken');
const app = express()


app.get('/protected-route', authToken, (req, res) => {
  res.json({
    message: 'Ruta protegida accedida!',
    userId: req.userId
  });
});

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
  
}))
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('hello')
})

app.use("/api", router)

const PORT = process.env.PORT || 8080

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("connect to DB")
    console.log("Server is running on port " + PORT)
  })
})
