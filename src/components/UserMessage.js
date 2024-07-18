
function UserMessage({message,time}){
    return(
        <div>

            <h4>{message}</h4>
            <p>{`Sent by you on ${time}`}</p>            
        </div>
    )
}
export default UserMessage