import { useState } from 'react'
import Filter from "./components/Filter.js"
import PersonForm from "./components/PersonForm.js"
import Persons from "./components/Persons.js"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
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
    const result = persons.map(person => JSON.stringify(person.name) === JSON.stringify(newName)
    ?true:false)
    result.includes(true)? alert(`${newName} alredy in the list`)
    :setPersons(persons.concat({ name: newName, number: newNum }))
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