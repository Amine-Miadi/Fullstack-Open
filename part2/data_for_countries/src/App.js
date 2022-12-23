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
  <button onClick={() => props.handleButton(props.indx)}>show</button>
  )
}

const Display = (props) =>{
  function handleButton(indx){
    props.setSelected(indx)
  }


  if(props.filteredcountries.length > 10){
    return(
      <div>list is too long</div>
    )
  }

  else if(props.filteredcountries.length > 1 && props.selected === null){
    return(
      <div>
        {(props.filteredcountries.map((country,key) =>
          <li key = {key}>
            {country.name.common}    <Button indx = {key} handleButton={handleButton}/>
          </li>
          )
        )}
      </div>
    ) 
  }

  if(props.selected !== null || props.filteredcountries.length === 1){
    const languages = Object.values(props.filteredcountries[0].languages)
    if(props.filteredcountries.length === 1)props.setSelected(0)
    return(
      <div>
        <h1>{props.filteredcountries[props.selected].name.common}</h1>
        capital: {props.filteredcountries[props.selected].capital[0]}
        <br/>
        area: {props.filteredcountries[props.selected].area}
        <h3>Languages</h3>
        <ul>
          {languages.map((language,i) => <li key = {i}>{language}</li>)}
        </ul>
        <img src = {props.filteredcountries[props.selected].flags.png} alt ="flag"></img>
      </div>
    )
  }
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
  const [filteredcountries,setFiltered] = useState([])
  const [selected,setSelected] = useState(null)

  const handleChange = (event) =>{
    setFiltered(countries.filter(country => country.name.common.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())))
    setLookup(event.target.value)
    setSelected(null)
  }

  return (
    <div>
      <Form handle = {handleChange} name = {lookup}/>
      <Display filteredcountries = {filteredcountries} selected={selected} setSelected = {setSelected}/>
    </div>
  );
}

export default App;
