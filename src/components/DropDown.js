import { useNavigate } from "react-router-dom"
import UserContext from "../UserContext"
import { useContext } from "react"

function DropDown(){
    const navigate = useNavigate()
    const {logout} = useContext(UserContext)
    return(
        <div className="drop-down">
            <ul>
                <li className="drop-down-link" onClick={()=>navigate('/profile')}>Profile</li>
                <li className="drop-down-link" onClick={logout}>Logout</li>
            </ul>
        </div>
    )
}

export default DropDown