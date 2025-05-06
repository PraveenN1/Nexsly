import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {Home} from "./pages/Home";
import {Signup} from "./pages/auth/Signup.jsx";
import CreatePost from './pages/CreatePost';
import Settings from './pages/Settings';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/create-post' element={<CreatePost/>}/>
        <Route path='/auth/signup' element={<Signup/>}/>
        <Route path='/settings' element={<Settings/>}/>
      </Routes>
    </Router>
  )
}

export default App