require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const authRouter = require('./src/routes/auth.router')

const redis = require('redis')
const session = require('express-session')
let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient();

const { PORT, COOKIE_SECRET, COOKIE_NAME} = process.env

app.set('cookieName', COOKIE_NAME)

app.use(cors({
  origin: true,
  credentials: true,
}))

app.use(express.json())

app.use(
  session({
  name: app.get('cookieName'),
  secret: COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({ client: redisClient }),
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1e3 * 86400, // COOKIE'S LIFETIME — 1 DAY
  },
}))

app.use('/api/v1/auth', authRouter)

app.listen(PORT, () => console.log("Server has been started on port ", PORT))
