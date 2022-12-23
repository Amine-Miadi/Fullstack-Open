import { useState,useEffect } from 'react'
import Filter from "./components/Filter.js"
import PersonForm from "./components/PersonForm.js"
import Persons from "./components/Persons.js"
import axios from 'axios'

const App = () => {
  
  const hook = () =>{
    axios.get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
      setShown(response.data)
    })
  }
  useEffect(hook,[])
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [showPersons, setShown] = useState(persons)
  console.log(persons, "persons")
  console.log(showPersons, "showpersons")
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
    const result = persons.map(person => JSON.stringify(person.name) === JSON.stringify(newName)
    ?true:false)
    if (result.includes(true)){
      alert(`${newName} alredy in the list`)
    } 
    else{
      setPersons(persons.concat({ name: newName, number: newNum }))
      setShown(persons.concat({ name: newName, number: newNum }))
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
      <Persons showPersons={showPersons} />
    </div>
  )
}

export default App