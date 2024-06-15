import React from 'react';
import {BrowserRouter as Router, Routes} from 'react-router-dom';
import { Route} from 'react-router';
import './App.css';
import { Toaster } from 'react-hot-toast';

//components import

import Navbar1 from './components/Navbar1/Navbar1'
import ContactMe from './components/ContactMe/ContactMe';
import Auth from './components/Auth/Auth';
import VerifyEmail from './components/VerifyEmail/VerifyEmail';
import Sidebar from './components/Sidebar/Sidebar'
import MainPageWindow from './components/MainPageWindow/MainPageWindow'
import QuestionWindow from './components/QuestionWindow/QuestionWindow'
import CrashWindow from './components/CrashWindow/CrashWindow'
import LeaderboardWindow from './components/LeaderboardWindow/LeaderboardWindow'
import ProfileWindow from './components/ProfileWindow/ProfileWindow'

const App = () => {

  return(
    <div>
      <Toaster/>
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path='/' element={
          <div>
            <Navbar1/>
            <div className="mainContainer">
              <div className="sideBar_maincontainer">
                <Sidebar/>
              </div>
              <div className="noti_maincontainer">
                <MainPageWindow/>
              </div>
            </div>
          </div>
        }/>
        <Route path='/answer-questions' element={
          <div>
            <Navbar1/>
            <div className="mainContainer">
              <div className="sideBar_maincontainer">
                <Sidebar/>
              </div>
              <div className="noti_maincontainer">
                <QuestionWindow/>
              </div>
            </div>
          </div>
        }/>
        <Route path='/crash' element={
          <div>
            <Navbar1/>
            <div className="mainContainer">
              <div className="sideBar_maincontainer">
                <Sidebar/>
              </div>
              <div className="noti_maincontainer">
                <CrashWindow/>
              </div>
            </div>
          </div>
        }/>
        <Route path='/leaderboard' element={
          <div>
            <Navbar1/>
            <div className="mainContainer">
              <div className="sideBar_maincontainer">
                <Sidebar/>
              </div>
              <div className="noti_maincontainer">
                <LeaderboardWindow/>
              </div>
            </div>
          </div>
        }/>
        <Route path='/profile' element={
          <div>
            <Navbar1/>
            <div className="mainContainer">
              <div className="sideBar_maincontainer">
                <Sidebar/>
              </div>
              <div className="noti_maincontainer">
                <ProfileWindow/>
              </div>
            </div>
          </div>
        }/>
        <Route path='/contactMe' element={<div><Navbar1/><ContactMe/></div>}/>
        <Route path='/auth' element={<div><Auth/></div>}/> 
        <Route path='/verify-email' element={<VerifyEmail/>}/>
        <Route path='*' element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
    </div>
  )
}

export default App;