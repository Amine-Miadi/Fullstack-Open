import { useState,useEffect } from 'react'
import Filter from "./components/Filter.js"
import PersonForm from "./components/PersonForm.js"
import Persons from "./components/Persons.js"
import Message from "./components/Message.js"
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
  const [message, setMessage] = useState({text: null,code: -1})

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
        server
        .update(existingperson.id,{name: newName,number: newNum})
        //upon successful update
        .then(() => {
          //pop success message
          setMessage({text: `updated ${existingperson.name} successfully`,code: 1})
            setTimeout(() => {
              setMessage({message: null,code: -1})
            }, 5000);
          //get data from server to display it 
          server.getall()
          .then(data => {
            setPersons(data)
            setShown(data)
          })
        })
        //catch 404 error
        .catch(error => {
          setMessage({text: `${existingperson.name} already deleted from server`,code: 0})
            server.getall()
            .then(data => {
              setPersons(data)
              setShown(data)
            })
            setTimeout(() => {
              setMessage({message: null,code: -1})
            }, 5000);
        })
      }
    } 
    else{
      server.create({ name: newName, number: newNum })
      .then(response => {
        setPersons(response)
        setShown(response)
      })
      setMessage({text: `added ${newName} successfully!`, code:1})
      setTimeout(() => {
        setMessage({message: null,code: -1})
      }, 5000);
    }
    
  }

  function handleDelete(id){
    const person = persons.find(person => person.id === id)
    if (window.confirm(`do you really want to delete ${person.name}?`)) {
      server
      .remove(id)
      .then(response => {
        setMessage({text: `successfully deleted ${person.name}`, code:1})
        setTimeout(() => {
          setMessage({message: null,code: -1})
        }, 5000);
        server.getall()
        .then(data => {
          setPersons(data)
          setShown(data)
        })
      })
      .catch(error => {
        server.getall()
            .then(data => {
              setPersons(data)
              setShown(data)
            })
        setMessage({text: `${person.name} already deleted!!!`,code: 0})
          setTimeout(() => {
            setMessage({message: null,code: -1})
          }, 5000);
        return
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message = {message} /> <br />
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