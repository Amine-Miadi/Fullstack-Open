import { useState,useEffect } from 'react'
import Filter from "./components/Filter.js"
import PersonForm from "./components/PersonForm.js"
import Persons from "./components/Persons.js"
import server from './services/server.js'

const App = () => {
  

  useEffect(() =>{
    server.getall()
    .then(data => {
      setPersons(data)
      setShown(data)
    })
  },[])

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [showPersons, setShown] = useState(persons)

  const handlePersonchange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumchange = (event) => {
    setNewNum(event.target.value)
  }

  const handleFilter = (event) =>{
    setShown(persons.filter(person => person.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const existingperson = persons.find(person => JSON.stringify(person.name) === JSON.stringify(newName))

    if (existingperson){
      if (window.confirm(`${existingperson.name} is already added to the phonebook, replace old number with a new one?`)){
        server.update(existingperson.id,{name: newName,number: newNum})
        .then(() => {
          server.getall()
          .then(data => {
            setPersons(data)
            setShown(data)
          })
        })
      }
    } 
    else{
      server.create({ name: newName, number: newNum })
      .then(response => {
        setPersons(persons.concat(response))
        setShown(persons.concat(response))
      })
    }
    
  }

  function handleDelete(id){
    const person = persons.find(person => person.id === id)
    if (window.confirm(`do you really want to delete ${person.name}?`)) {
      server.remove(id)
      .then(response => {
        server.getall()
        .then(data => {
          setPersons(data)
          setShown(data)
        })
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter handleFilter = {handleFilter} />
      </div>
      <h2>Add person</h2>
        <PersonForm 
          handleSubmit = {handleSubmit} 
          newName = {newName} 
          handlePersonchange = {handlePersonchange}
          newNum = {newNum}
          handleNumchange = {handleNumchange}
        />
      <h2>Numbers</h2>
      <Persons showPersons={showPersons} handleDelete={handleDelete}/>
    </div>
  )
}

export default App