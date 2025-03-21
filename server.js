const express = require('express');
require('./config/database');
const PORT = process.env.PORT
const cors = require('cors');
const weatherRouter = require('./router/weatherRouter');
 
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/v1', weatherRouter)

app.listen(PORT, ()=>{
    console.log(`app is listening to server:${PORT}`)
 })