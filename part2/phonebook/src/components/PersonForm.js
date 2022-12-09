const PersonForm = (props) =>{

    return(
        <div>
            <form onSubmit = {props.handleSubmit}>
                <div>
                name: <input value = {props.newName} onChange = {props.handlePersonchange}/>
                </div>
                <div>
                number: <input value = {props.newNum} onChange = {props.handleNumchange}/>
                </div>
                <div>
                <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm