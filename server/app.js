require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const authRouter = require("./src/routes/auth.router");
const sentFormRouter = require("./src/routes/sentForm.router");
const rootRouter = require("./src/routes/rootRouter");
const errorHandler = require("./src/controllers/error.controller");
const checkFormToPersonRouter = require("./src/routes/checkFormToPerson.router");
const path = require("path");
const wishRouter = require("./src/routes/wishRouter");
const presentsRouter = require('./src/routes/presentsRouter')

const redis = require("redis");
const session = require("express-session");
const groupRouter = require("./src/routes/group.router");
let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient();

const { SERVER_PORT, COOKIE_SECRET, COOKIE_NAME } = process.env;

app.set("cookieName", COOKIE_NAME);

app.use(logger("dev"));
app.use("/", rootRouter);

// const rootRouter = require('./src/routes/rootRouter')

app.use(cors({ credentials: true, origin: true }));

app.use(express.json());
app.use(express.static(path.join(process.env.PWD, "public")));

app.use(
  session({
    name: app.get("cookieName"),
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({ client: redisClient }),
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1e3 * 86400, // COOKIE'S LIFETIME — 1 DAY
    },
  })
);

app.use("/api/v1/auth", authRouter);
app.use("/sentform", sentFormRouter);
app.use("/api/v1/form", checkFormToPersonRouter);
app.use("/api/v1/group", groupRouter);
app.use("/wish", wishRouter);
app.use('/presents', presentsRouter)

//обработчик ошибок
app.use(errorHandler);

app.listen(SERVER_PORT, () =>
  console.log("Server has been started on port ", SERVER_PORT)
);
