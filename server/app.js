const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()

app.use(cors({origin:'http://localhost:3000'}))
app.use(express.json())





app.listen(process.env.SERVER_PORT, () => console.log("Server has been started on port ", process.env.SERVER_PORT))
