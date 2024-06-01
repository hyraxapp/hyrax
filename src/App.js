import React from 'react';
import {BrowserRouter as Router, Routes} from 'react-router-dom';
import { Route} from 'react-router';
import './App.css';
import { Toaster } from 'react-hot-toast';

//components import

import BatchPrompt from './components/BatchPrompt/BatchPrompt';
import Navbar1 from './components/Navbar1/Navbar1'
import ViewList from './components/ViewList/ViewList';
import InterViewExp from './components/InterViewExp/InterViewExp';
import CreatePost from './components/CreatePost/CreatePost';
import ContactMe from './components/ContactMe/ContactMe';
import Auth from './components/Auth/Auth';
import MyPosts from './components/MyPosts/MyPosts';
import VerifyEmail from './components/VerifyEmail/VerifyEmail';
import Sidebar from './components/Sidebar/Sidebar'
import MainPageWindow from './components/MainPageWindow/MainPageWindow'
import QuestionWindow from './components/QuestionWindow/QuestionWindow'

const App = () => {

  return(
    <div>
      <Toaster/>
    <Router>
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
        <Route path='/viewList/search' element={<div><Navbar1/><ViewList/></div>}/>    
        <Route path='/viewList/:batchNum/:dept' element={<div><Navbar1/><ViewList/></div>}/>
        <Route path='/posts/:id' element={<div><Navbar1/><InterViewExp/></div>}/>
        <Route path='/ShareExperience' element={<div><Navbar1/><CreatePost/></div>}/>
        <Route path='/viewExp/:id' element={<div><Navbar1/><InterViewExp/></div>}/>
        <Route path='/contactMe' element={<div><Navbar1/><ContactMe/></div>}/>
        <Route path='/auth' element={<div><Auth/></div>}/> 
        <Route path='/MyPosts/:creatorName/:creatorId' element={<div><Navbar1/><MyPosts/></div>}/>
        <Route path='/verify-email' element={<VerifyEmail/>}/>
        <Route path='*' element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
    </div>
  )
}

export default App;