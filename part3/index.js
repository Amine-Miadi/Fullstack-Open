const express = require('express')
const app = express()


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

app.get('/api/persons',(req,res)=>{
    res.json(persons)
})

app.get('/info',(req,res)=>{
    const date = new Date();
    res.send(
        `Phonebook has info for ${persons.length} people <br />
        ${date}`
    )
})

app.get('/api/persons/:id',(req,res)=>{
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if(person){
        res.json(person)
    }else{
        res.status(404).end()
    }
})

app.delete('/api/persons/:id',(req,res)=>{
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
    console.log(persons)
})

app.post('/api/persons',(req,res)=>{
    const body = req.body
    console.log(req.body)
    if (!body.name) {
        return res.status(400).json({ 
        error: 'name is missing' 
        })
    }else if (!body.number){
        return res.status(400).json({ 
            error: 'number is missing' 
        })
    }else if(persons.find(person => person.name === body.name)){
        console.log("eyo wtf")
        return res.status(400).json({ 
            error: 'name must be unique' 
        })
    }
    const person = { 
        "id": Math.floor(Math.random()*10000),
        "name": body.name, 
        "number": body.number
    }
    persons = persons.concat(person)
    res.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})