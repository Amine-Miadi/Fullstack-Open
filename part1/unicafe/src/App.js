import { useState } from "react";

const Button = (props) =>{
  return(
    <button onClick = {props.Onclick}>{props.text}</button>
  )
}

const Statisticline = (props) =>{
  if(props.text === "positive"){
    return(
      <tr>
        <td>{props.text}</td>
        <td>{props.value} %</td>
      </tr> 
    )
  }
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = ({good,bad,neutral}) =>{
  var all = good+bad+neutral
  var average = (good-bad)/all
  var positive = good*100/all
  if(all === 0){
    average = 0
    positive =0
  }
  if(all === 0){return <div>No feedback Given</div>}
  return(
    <div>
      <table>
        <tbody>
          <Statisticline text = "bad" value = {bad}/>
          <Statisticline text = "good" value = {good}/>
          <Statisticline text = "neutral" value = {neutral}/>
          <Statisticline text = "all" value = {all}/>
          <Statisticline text = "average" value = {average}/>
          <Statisticline text = "positive" value = {positive}/>
        </tbody>
      </table>
      
    </div>
    
  )
}



function App() {
  const  [good, setGood] = useState(0)
  const  [neutral, setNeutral] = useState(0)
  const  [bad, setBad] = useState(0)
  
  


  const handleGood = () =>{
    setGood(good+1)
  }
  const handleNeutral = () =>{
    setNeutral(neutral+1)
  }
  const handleBad = () =>{
    setBad(bad+1)
  }


  return (
    <div className="App">
      <h1>give feedback</h1>
      <br />
      <Button Onclick = {handleGood} text = "good"/>
      <Button Onclick = {handleNeutral} text = "neutal"/>
      <Button Onclick = {handleBad} text = "bad"/>
      <br />
      <h1>Statistics</h1>
      <br />
      
      <Statistics good = {good} bad= {bad} neutral = {neutral} />
        
    </div>
  );
}

export default App;
