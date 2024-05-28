/* const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')
const multer = require('multer');


const app = express()
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json());
app.use("/api", router)

// Log incoming requests for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

app.post('/api/signin', (req, res) => {
  const { username, password } = req.body;
  if (username === 'test' && password === 'test') {
    res.json({ success: true, message: 'Sign in successful!' });
  } else {
    res.json({ success: false, message: 'Invalid credentials' });
  }
});
app.use(bodyParser.json({ limit: '100mb' })); // Para JSON
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true })); // Par
// Configura `multer`
const upload = multer({
  limits: { fileSize: 100 * 1024 * 1024 } // 50 MB
});
app.post('/api/upload', upload.single('file'), (req, res) => {
  res.json({ success: true, message: 'File uploaded successfully!' });
});
const PORT = 8080 || process.env.PORT

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("connnect to DB")
    console.log("Server is running " + PORT)
  })
}) */

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')


const app = express()
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api", router)

const PORT = 8080 || process.env.PORT


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("connnect to DB")
    console.log("Server is running " + PORT)
  })
})
