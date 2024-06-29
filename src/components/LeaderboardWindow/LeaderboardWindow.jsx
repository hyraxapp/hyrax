import React, { useEffect, useState } from 'react';
import { getTopUsers, getMoney } from '../../actions/posts';
import { toast } from "react-hot-toast"
import './LeaderboardWindow.css';

const LeaderboardWindow = () => {
const user = JSON.parse(localStorage.getItem("profile"));
const [topUsers, setTopUsers] = useState([]);
const [extraPlace, setExtraPlace] = useState(0);
const [userMoney, setUserMoney] = useState(0);
useEffect(() => {
    if (user) {
        // Function to fetch top 10 users based on money descending
        const fetchTopUsers = async () => {
            const toastId = toast.loading("Loading..");
            try {
                // Replace this with actual API endpoint for fetching leaderboard data
                const response = await getTopUsers(user?.result?._id);
                let tuserMoney = await getMoney(user?.result?._id);
                let money = parseFloat(tuserMoney.money.$numberDecimal);
                setUserMoney(money);
                if (response) {
                    console.log(response.list);
                    maxAccept = 100
                    if (response.list.length > maxAccept) {
                        setExtraPlace(response.list[maxAccept]);
                        setTopUsers(response.list.splice(maxAccept, maxAccept+1)); // Assuming data is an array of top users
                    } else if (typeof(response.list[response.list.length - 1]) === "number") {
                        setExtraPlace(response.list[response.list.length - 1]);
                        setTopUsers(response.list.splice(response.list.length - 1, response.list.length));
                    }
                    setTopUsers(response.list); // Assuming data is an array of top users
                } else {
                    throw new Error('Failed to fetch leaderboard data');
                }
            } catch (error) {
                console.error('Error fetching leaderboard data:', error);
            }
            toast.dismiss(toastId);
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
                        {user.money && (<span className="money">${truncateToDecimals(parseFloat(user.money.$numberDecimal)).toLocaleString('en', {useGrouping:true})}</span>)}
                    </li>
                ))}
                {(parseInt(extraPlace) != 0 && parseInt(extraPlace) > 9) && 
                    <li key={extraPlace + 1} className="leaderboard_item">
                        <span className="rank">{extraPlace + 1}.</span>
                        <span className="username">{user?.result?.name}</span>
                        <span className="money">${truncateToDecimals(parseFloat(userMoney)).toLocaleString('en', {useGrouping:true})}</span>
                    </li>
                }
            </ul>
        </div>
    </div>
)
};


export default LeaderboardWindow;