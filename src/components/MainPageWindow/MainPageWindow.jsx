import React from 'react';
import './MainPageWindow.css';

const MainPageWindow = () => {
    const user = JSON.parse(localStorage.getItem("profile"));
    return(
        <>
        {user ? (
                <div className='mainpage_container'>
                    <div className="mainpage_header">SAT Math Prep</div>
                    <div className="mainpage_box">Please Select One of the Fields on the Left to Begin</div>
                </div>
            ) : (
                <div className='mainpage_container'>
                    <div className="mainpage_header">SAT Math Prep</div>
                    <div className="mainpage_box">Welcome! Please sign in to start</div>
                </div>
            )
        }
        </>
    )
}

export default MainPageWindow;