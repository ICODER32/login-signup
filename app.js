const express = require('express')
require('dotenv').config()
const authRoutes = require('./routes/auth')
require('./db/dbConnect')

const app = express()
app.use(express.json())

app.use(authRoutes)



app.listen(process.env.PORT, () => {
    console.log('Server Started');
})