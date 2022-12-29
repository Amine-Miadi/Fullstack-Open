require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log(url, typeof(url))
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const infoSchema = mongoose.Schema({
    name: String,
    number: String
})

infoSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

 
module.exports = mongoose.model('Person',infoSchema)

