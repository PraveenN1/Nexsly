import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from "./pages/feeds/Home";
import {Signup} from "./pages/auth/Signup.jsx";
import CreatePost from './pages/your-stuff/CreatePost';
import ViewPost from './pages/feeds/ViewPost';
import Settings from './pages/your-stuff/Settings';
import Popular from './pages/feeds/Popular';
import All from './pages/feeds/All';
import Messages from './pages/your-stuff/Messages';
import Notifications from './pages/your-stuff/Notifications';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/popular' element={<Popular/>}/>
        <Route path='/all' element={<All/>}/>
        <Route path='/create-post' element={<CreatePost/>}/>
        <Route path='/messages' element={<Messages/>}/>
        <Route path='/notifications' element={<Notifications/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/view-post/:id' element={<ViewPost/>}/>
        <Route path='/auth/signup' element={<Signup/>}/>
      </Routes>
    </Router>
  )
}

export default App