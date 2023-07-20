const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const express = require('express')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const app = express()



const mongoUrl = config.MONGODB_URI

mongoose.set('strictQuery', false);

mongoose.connect(mongoUrl)
.then(() => {
    console.log('connected to MongoDB')
})
.catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
})



app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs',blogsRouter)

module.exports = app