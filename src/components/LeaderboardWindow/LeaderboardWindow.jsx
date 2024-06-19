import React, { useEffect, useState } from 'react';
import { getTopUsers } from '../../actions/posts';
import './LeaderboardWindow.css';

const LeaderboardWindow = () => {
const user = JSON.parse(localStorage.getItem("profile"));
const [topUsers, setTopUsers] = useState([]);
useEffect(() => {
    if (user) {
        // Function to fetch top 10 users based on money descending
        const fetchTopUsers = async () => {
            try {
                // Replace this with actual API endpoint for fetching leaderboard data
                const response = await getTopUsers();
                console.log(response);
                if (response) {
                    console.log(response.list);
                    setTopUsers(response.list); // Assuming data is an array of top users
                } else {
                    throw new Error('Failed to fetch leaderboard data');
                }
            } catch (error) {
                console.error('Error fetching leaderboard data:', error);
            }
        };

        fetchTopUsers();
    }
}, []);
function truncateToDecimals(num, dec = 2) {
    const calcDec = Math.pow(10, dec);
    return Math.trunc(num * calcDec) / calcDec;
}
return (user &&
    <div className="leaderboard_window">
        <div className="leaderboard_container">
            <h1 className="leader_title">Rankings</h1>
            <ul className="leaderboard_list">
                {topUsers.map((user, index) => (
                    <li key={index+1} className="leaderboard_item">
                        <span className="rank">{index + 1}.</span>
                        <span className="username">{user.name}</span>
                        <span className="money">${truncateToDecimals(parseFloat(user.money.$numberDecimal))}</span>
                    </li>
                ))}
            </ul>
        </div>
    </div>
)
};


export default LeaderboardWindow;