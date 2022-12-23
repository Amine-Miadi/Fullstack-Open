import { useEffect,useState } from "react";
import axios from 'axios'



const Form = (props) =>{
  return(
    <div>
      find countries <input value = {props.name} onChange={props.handle}></input>
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
  const [display, setDisplay] = useState()

  const handleChange = (event) =>{
    setLookup(event.target.value)
    const filteredwountries = countries.filter(country => country.name.common.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))
    if(filteredwountries.length > 10){
      setDisplay("list is too long")
    }
    
    else if (filteredwountries.length === 1){
      const languages = Object.values(filteredwountries[0].languages)
      setDisplay(
        <div>
          {console.log(filteredwountries[0].name.common)}
          <h1>{filteredwountries[0].name.common}</h1>
          capital: {filteredwountries[0].capital[0]}
          <br/>
          area: {filteredwountries[0].area}
          <h3>Languages</h3>
          <ul>
            {languages.map(language => <li>{language}</li>)}
          </ul>
          <img src = {filteredwountries[0].flags.png} alt ="flag"></img>
        </div>
      )
    }
    else if(filteredwountries.length < 10){
      setDisplay(filteredwountries.map((country,key) => <li key = {key}>{country.name.common}</li>))
    }
  }

  return (
    <div>
      <Form handle = {handleChange} name = {lookup}/>
      {display}
    </div>
  );
}

export default App;
