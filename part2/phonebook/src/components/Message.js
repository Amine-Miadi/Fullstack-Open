const Message = ({message}) =>{
    const errstyle = {
        color: 'red',
        border: 'solid',
        background: 'grey',
        borderRadius: 5,
        padding: 10,
        fontSize: 20
    }
    const validstyle = {
        color: 'green',
        border: 'solid',
        background: 'cyan',
        borderRadius: 5,
        padding: 10,
        fontSize: 20
    }
    if(message.text === null){
        return(null)
    }
    else if(message.code === 0){
        return(
            <div style = {errstyle}>
                {message.text}<br/>
            </div>
        )
    }
    else if(message.code === 1){
        return(
            <div style = {validstyle}>
                {message.text}<br/>
            </div>
        )
    }
}

export default Message;