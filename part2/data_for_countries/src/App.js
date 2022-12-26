import { useEffect,useState } from "react";
import axios from 'axios'



const Form = (props) =>{
  return(
    <div>
      find countries <input value = {props.name} onChange={props.handle}></input>
    </div>
  )
}

const Button = (props) =>{
  return(
  <button onClick={() => props.handleSelect(props.indx)}>show</button>
  )
}

const List = ({list,handleSelect}) =>{
  return(
    <div>
      {list.map((cntry,i) => <li key = {i}>{cntry.name.common} <Button handleSelect = {handleSelect}indx = {i}/> </li>)}
    </div>
  )
}

const Country = ({country}) =>{
  const languages = Object.values(country.languages)
  return(
    <div>
      <h1>{country.name.common}</h1>
      Capital: {country.capital} <br />
      Area: {country.area}<br />
      <ul>
        {languages.map((l,i) => <li key = {i}> {l} </li>)}
      </ul>
      <img src={country.flags.png} alt="the flag"></img>
    </div>
  )
}

function App() {
  const hook = () => {
    axios.get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
  }

  useEffect(hook, [])


  const [countries,setCountries] = useState([])
  const [lookup,setLookup] = useState('')
  const [list, setList] = useState([])

  const handleChange = (event) =>{
    setList(countries.filter(country => country.name.common.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())))
    setLookup(event.target.value)
  }

  const handleSelect = (id) =>{
    setList([list[id]])
    console.log(id)
  }

  return (
    <div>
      <Form handle = {handleChange} name = {lookup}/>
      {list.length > 10 && <div>The list is too long, Please narrow down the search.</div>}
      {list.length < 10 && list.length !== 1 && <List list = {list} handleSelect = {handleSelect} />}
      {list.length === 1  && <Country country = {list[0]} />}
      
    </div>
  );
}

export default App;
