require("dotenv").config();
const express = require("express");
const app = express();
const logger = require('morgan')
const cors = require('cors');
// const rootRouter = require('./src/routes/rootRouter')
const authRouter = require('./src/routes/auth.router')
const path = require('path')

const redis = require('redis')
const session = require('express-session')
let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient();

const { SERVER_PORT, COOKIE_SECRET, COOKIE_NAME} = process.env
const sentFormRouter = require('./src/routes/sentForm.router');
const wishRouter = require('./src/routes/wishRouter');



app.use(logger('dev'))
app.use(cors({origin:'http://localhost:3000'}))



app.set('cookieName', COOKIE_NAME)

app.use(cors({
  origin: true,
  credentials: true,
}))

app.use(express.json())
app.use(express.static(path.join(process.env.PWD, 'public')));

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
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
app.use('/sentform', sentFormRouter)
app.use('/wish', wishRouter)



app.listen(SERVER_PORT, () => console.log("Server has been started on port ", SERVER_PORT))
