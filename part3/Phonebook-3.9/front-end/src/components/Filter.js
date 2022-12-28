const Filter = (props) => {
    return(
     <div>
        Filter: <input  onChange={props.handleFilter}/>
     </div>
    )
}

export default Filter;