import React from 'react';
import {BrowserRouter as Router, Routes} from 'react-router-dom';
import { Route} from 'react-router';
import './App.css';
import { Toaster } from 'react-hot-toast';

//components import

import Navbar1 from './components/Navbar1/Navbar1'
import Footer from './components/Footer/Footer'
import Footer2 from './components/Footer2/Footer2'
import ContactMe from './components/ContactMe/ContactMe';
import Referral from './components/Referral/Referral';
import ReferralView from './components/ReferralView/ReferralView';
import Auth from './components/Auth/Auth';
import VerifyEmail from './components/VerifyEmail/VerifyEmail';
import Sidebar from './components/Sidebar/Sidebar'
import MainPageWindow from './components/MainPageWindow/MainPageWindow'
import QuestionWindow from './components/QuestionWindow/QuestionWindow'
import CrashWindow from './components/CrashWindow/CrashWindow'
import LeaderboardWindow from './components/LeaderboardWindow/LeaderboardWindow'
import ProfileWindow from './components/ProfileWindow/ProfileWindow'
import PlinkoWindow from './components/PlinkoWindow/PlinkoWindow'
import DashboardWindow from './components/DashboardWindow/DashboardWindow'

const App = () => {

  return(
    <div>
      <Toaster/>
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        {/* <Route path='/' element={
            <div>
              <DashboardWindow/>
            </div>
          }/> */}
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
              <Footer/>
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
              <Footer/>
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
              <Footer/>
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
              <Footer/>
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
              <Footer/>
            </div>
          </div>
        }/>
        <Route path='/plinko' element={
          <div>
            <Navbar1/>
            <div className="mainContainer">
              <div className="sideBar_maincontainer">
                <Sidebar/>
              </div>
              <div className="noti_maincontainer2">
                <PlinkoWindow/>
              </div>
              <Footer/>
            </div>
          </div>
        }/>
        <Route path='/contactMe' element={<div className="wholePage"><Navbar1/><ContactMe/><Footer2/></div>}/>
        <Route path='/referral' element={<div className="wholePage"><Navbar1/><Referral/><Footer2/></div>}/>
        <Route path='/referralView' element={
          <div>
            <Navbar1/>
            <div className="mainContainer">
              <div className="sideBar_maincontainer">
                <Sidebar/>
              </div>
              <div className="noti_maincontainer">
                <ReferralView/>
              </div>
              <Footer/>
            </div>
          </div>
        }/>
        <Route path='/auth' element={<div><Auth/></div>}/> 
        <Route path='/authSignUp' element={<div><Auth choseSignUp="true"/></div>}/> 
        <Route path='/verify-email' element={<VerifyEmail/>}/>
        <Route path='*' element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
    </div>
  )
}

export default App;