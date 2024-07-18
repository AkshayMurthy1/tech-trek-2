import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import UserContext from '../UserContext';

function Login(){
    const {user,login,logout} = useContext(UserContext)
    const navigate = useNavigate()

    const [signUpUser, setSignUpUser] = useState('');
    const [signUpPass, setSignUpPass] = useState('');
    const [loginUser, setLoginUser] = useState('');
    const [loginPass, setLoginPass] = useState('');

    useEffect(()=>{
        if (user!=""){
            navigate('/forum')
        }
    },[user])
    const checkUser = (u,p) =>{
        return (u.length>=3 && p.length>5)?  "good":"bad"
    }

    const handleSignUpSubmit = async (event) => {
        event.preventDefault();
        const result = await axios.get('/logins')
        const logins = result.data
        for (const lg of logins){
            if (lg.username===signUpUser){
                alert("Username already exists")
                return
            }
        }
        const data = { username: signUpUser, password: signUpPass };
        await axios.post('/logins', data);
        alert('Thanks for signing up! You will now be redirected to our forums page');
        console.log('Signing up user:', signUpUser);
        login(signUpUser);
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault()
        const result = await axios.get('/logins')
        const logins = result.data
        for (const lg of logins){
        if (lg.username===loginUser&&lg.password===loginPass){
            login(loginUser)
            return
        }
        }
        alert("Login failed try again")
    };

    

    return (
        <div style={styles.container}>
            <div style={styles.loginContainer}>
                <h2 style={styles.txt}>Sign up</h2>
                <form className = "login" onSubmit={handleSignUpSubmit}>
                    <div style={styles.formGroup}>
                        <label htmlFor="username" style={styles.txt}>Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={signUpUser}
                            onChange={(e) => setSignUpUser(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="password" style={styles.txt}>Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={signUpPass}
                            onChange={(e) => setSignUpPass(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" style={styles.button}>Sign up</button>
                </form>
            </div>
            <div style={styles.loginContainer}>
                <h2 style = {styles.txt}>Login</h2>
                <form className = "login" onSubmit={handleLoginSubmit}>
                    <div style={styles.formGroup}>
                        <label htmlFor="username" style={styles.txt}>Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={loginUser}
                            onChange={(e) => setLoginUser(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="password" style={styles.txt}>Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={loginPass}
                            onChange={(e) => setLoginPass(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" style={styles.button}>Login</button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#0b0e1e',
        fontFamily:'Gill Sans'
    },
    txt:{
        color:"#5d7aff",
        fontWeight:"bold"
    },
    loginContainer: {
        backgroundColor: '#004aad',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        width: '100%',
        margin:'50px'
    },
    formGroup: {
        marginBottom: '15px',
    },
    input: {
        width: 'calc(100% - 20px)',
        padding: '10px',
        marginTop: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight:'bold'
    },
};

export default Login;