require('dotenv').config()
const Person = require('./models/mongo.js')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')



const app = express()
const PORT = process.env.PORT


app.use(express.static('build'))
app.use(express.json())

morgan.token('data', function getData (req) {
  const body = JSON.stringify(req.body)
  return body})


app.use(morgan(' :method :url :status :res[content-length] - :response-time ms :data'))
app.use(cors())

app.get('/api/persons',(req,res) => {
  Person.find({})
    .then(ppl => {
      res.json(ppl)
    })
})

app.get('/info',(req,res) => {
  const date = new Date()
  var people = null
  Person.find({})
    .then(ppl => {
      people = ppl
      res.send(
        `Phonebook has info for ${people.length} people <br />
                ${date}`
      )
    })
})

app.get('/api/persons/:id',(req,res,next) => {
  Person.findById(req.params.id)
    .then(person => {
      if(person){
        res.json(person)
      }
      else{res.status(404).end()}
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id',(req,res) => {
  Person.findByIdAndRemove(req.params.id)
    .then(person => res.json(person))
})

app.post('/api/persons',(req,res,next) => {
  const body = req.body
  var people = null
  Person.find({}).then(ppl => {
    people = ppl
    if (!body.name) {
      return res.status(400).json({
        error: 'name is missing'
      })
    }else if (!body.number){
      return res.status(400).json({
        error: 'number is missing'
      })
    }else if(people.find(person => person.name === body.name)){
      return res.status(400).json({
        error: 'name must be unique'
      })
    }
    const person = new Person ({
      'name': body.name,
      'number': body.number
    })
    person.save().then(person =>
      res.json(person)
    ).catch(error => next(error))
  })
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true ,runValidators: true, context: 'query' })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})


const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}


app.use(unknownEndpoint)



const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})