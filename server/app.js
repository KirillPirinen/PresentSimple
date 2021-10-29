const express = require('express');
const app = express();
const cors = require('cors');
const sentFormRouter = require('./src/routes/sentForm.router')

require('dotenv').config()

app.use(cors({origin:'http://localhost:3000'}))
app.use(express.json())



app.use('/sentform', sentFormRouter)

app.listen(process.env.SERVER_PORT, () => console.log("Server has been started on port ", process.env.SERVER_PORT))
