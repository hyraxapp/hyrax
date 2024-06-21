import React from 'react';
import './DashboardWindow.css';

const DashboardWindow = () => {
    const user = JSON.parse(localStorage.getItem("profile"));
    return (
        <>
        {user && 
         <div>Hello There</div>
        }
        </>
    );
}
export default DashboardWindow;