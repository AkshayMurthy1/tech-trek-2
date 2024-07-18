import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import Forum from './pages/Forum'
import Navbar from './components/Navbar';
import UserContext, { UserProvider } from './UserContext';
import Chat from './pages/Chat'
import HomeChat from './pages/HomeChat'
import { useParams } from 'react-router-dom';
import HomeForum from './pages/HomeForum'

function App() {
  return (
    <>
    
    <Router>
      <UserProvider>
    <div className='App'>
      <Navbar/>
    <div className='title'>
      <h1>Tech-Trek</h1>
      </div>
      <div className = "content">
        <Routes>
          <Route path = "/login" element = {<Login/>}/>
          <Route path = "/forum" element = {<HomeForum/>}/>
          <Route path = "/forum/:forum_catergory" element = {<ForumHelper/>}/>
          <Route path = "/chat" element = {<HomeChat/>}/>
          <Route path = "/chat/:user" element = {<ChatHelper/>}/>
          <Route path = "/*" element = {<Login/>}/>
        </Routes>


      </div>
    </div>
    </UserProvider>
    </Router>
    </>
    
  );
}

function ForumHelper(){
  const {forum_catergory} = useParams()
  return <Forum forum_name={forum_catergory}/>
}

function ChatHelper(){
  const {user} = useParams()
  return <Chat other={user}/>
}

export default App;
