require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const authRouter = require("./src/routes/auth.router");
const sentFormRouter = require("./src/routes/sentForm.router");
const rootRouter = require("./src/routes/rootRouter");
const errorHandler = require("./src/controllers/error.controller");
const formRouter = require("./src/routes/form.router");
const path = require("path");
const wishRouter = require("./src/routes/wishRouter");
const presentsRouter = require('./src/routes/presentsRouter');
const redis = require("redis");
const session = require("express-session");
const groupRouter = require("./src/routes/group.router");
const checkAuth = require('./src/middleware/checkAuth');
const appError = require("./src/Errors/errors");
let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient();

const { SERVER_PORT, COOKIE_SECRET, COOKIE_NAME } = process.env;

app.set("cookieName", COOKIE_NAME);

app.use(logger("dev"));
app.use("/", rootRouter);

// const rootRouter = require('./src/routes/rootRouter')

app.use(cors({ credentials: true, origin:'http://localhost:3000' }));

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

//руты доступные неавторизированным пользователям
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/sentform", sentFormRouter);

//приватные руты
app.use("/api/v1/form", checkAuth, formRouter);
app.use("/api/v1/group", checkAuth, groupRouter);
app.use("/wish", checkAuth, wishRouter);
app.use('/presents', checkAuth, presentsRouter)

//404
app.use((req,res,next)=> {
  next(new appError(404, 'Нет такой страницы'))
})

//обработчик ошибок
app.use(errorHandler);

app.listen(SERVER_PORT, () =>
  console.log("Server has been started on port ", SERVER_PORT)
);
