const Persons = (props) => {
    return(
     <div>
        <ul>
            {props.showPersons.map((person, i) => <li key = {i}>{person.name} {person.number}</li>)}
        </ul>
     </div>
    )
}

export default Persons;