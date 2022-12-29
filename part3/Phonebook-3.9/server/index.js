require('dotenv').config()
const Person = require('./models/mongo.js')
const { json } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')



const app = express()
const PORT = process.env.PORT


var persons = 
[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())
app.use(express.static('build'))
morgan.token('data', function getData (req) {
    const body = JSON.stringify(req.body);
    return body})


app.use(morgan(' :method :url :status :res[content-length] - :response-time ms :data'))
app.use(cors())

app.get('/api/persons',(req,res)=>{
    Person.find({})
        .then(ppl => res.json(ppl))
})

app.get('/info',(req,res)=>{
    const date = new Date();
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

app.get('/api/persons/:id',(req,res)=>{
    Person.findById(req.params.id)
        .then(person => res.json(person))
})

app.delete('/api/persons/:id',(req,res)=>{
    Person.deleteOne({id: req.params.id})
        .then(person => res.json(person))
})

app.post('/api/persons',(req,res)=>{
    const body = req.body
    var people = null
    Person.find({}).then(ppl => {
        people = ppl
        console.log(people)
        
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
            "id": Math.floor(Math.random()*10000),
            "name": body.name, 
            "number": body.number
        })
        person.save().then(
            person => res.json(person)
        )
    })
})



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})