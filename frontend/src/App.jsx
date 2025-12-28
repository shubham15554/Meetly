import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router} from "react-router-dom";
import {Routes, Route} from "react-router-dom";
import LandingPage from './pages/landingPage';
import { AuthProvider } from './context/authContext';
import Authentication from './pages/authentication';
import VedioMeet from './pages/vedioMeet';
import Home from './pages/home';
import GuestJoin from './pages/GuestJoin';
import Navbar from './Navbar';
import Footer from './footer';
import NewMeeting from './pages/newMeeting';
import History from './pages/history';
function App() {

  return (
    <>
    <Router>
       <AuthProvider>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/auth' element={<Authentication/>}/>
          <Route path='/home' element={<Home/>} />
          <Route path='/newMeeting'element={<NewMeeting/>}/>
          <Route path='/guestJoin' element={<GuestJoin/>}/>
          <Route path='/:url' element={<VedioMeet/>} />
          <Route path='/history' element={<History/>}/>
          
        </Routes>
       
      </AuthProvider>
    </Router>
      
    </>
  )
}

export default App
