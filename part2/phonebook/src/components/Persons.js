const Persons = (props) => {
    return(
     <div>
        <ul>
            {props.showPersons.map((person, i) => 
            <li key = {i}>
                {person.name} {person.number} &nbsp;&nbsp;
                <button onClick={() => props.handleDelete(person.id)}> Delete </button>
            </li>
            )}
        </ul>
     </div>
    )
}

export default Persons;