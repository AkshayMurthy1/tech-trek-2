
function OtherMessage({message,user,time}){
    return(
        <div>

            <h4>{message}</h4>
            <p>{`Sent by ${user} to you on ${time}`}</p>            
        </div>
    )
}
export default OtherMessage