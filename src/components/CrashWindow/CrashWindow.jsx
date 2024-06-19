import React, { useEffect, useState, useRef } from 'react';
import './CrashWindow.css';
import {getMoney, updateMoney, getTickets, updateTickets} from '../../actions/posts';
import { CancelScheduleSendOutlined } from '@mui/icons-material';

const CrashWindow = () => {
const user = JSON.parse(localStorage.getItem("profile"));
const canvasRef = useRef(null);
const [start, updateStart] = useState(false);
const [userMoney, setUserMoney] = useState('');
const [betAmount, setBetAmount] = useState('');
const [message, setMessage] = useState('');
const [isSubmitted, setIsSubmitted] = useState(false);
const [cashedOut, setCashedOut] = useState(true);
const [curNumber, setCurNumber] = useState('');
let number = 1;

const handleSubmit = async () => {
    setCashedOut(false);
    const amount = parseFloat(betAmount);
    let tuserMoney = await getMoney(user?.result?._id);
    let userMoney = parseFloat(tuserMoney.money.$numberDecimal);
    let numTickets = await getTickets(user?.result?._id);
    let userHasTicket = parseInt(numTickets.tickets) > 0;
    // Clear previous messages
    setMessage('');

    if (isNaN(amount) || amount <= 0) {
        setMessage('Please enter a valid decimal amount.');
    } else if (amount > userMoney) {
        setMessage('You do not have enough money to place this bet.');
    } else if (!userHasTicket) {
        setMessage('You do not have a ticket to place a bet.');
    } else {
        setMessage('Bet placed successfully!');
        await updateTickets(user?.result?._id, -1);
        await updateMoney(user?.result?._id, -1 * amount);
        setIsSubmitted(true);
        updateStart(true);
    }
};

const handleCashOut = async () => {
    setCashedOut(true);
    const amount = parseFloat(betAmount);
    try {
        await updateMoney(user?.result?._id, amount * curNumber);
    } catch (error) {
        console.log(error);
    }
};

useEffect(() => {
    if (user) {
        const retrieveMoney = async() => {
            let tuserMoney = await getMoney(user?.result?._id);
            let userMoney = parseFloat(tuserMoney.money.$numberDecimal);
            setUserMoney(userMoney);
        }
        retrieveMoney();
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.canvas.width = 2400;
        ctx.canvas.height = 1200;
        const width = canvas.width;
        const height = canvas.height;

        const backgroundLayer = new Image();
        const backgroundLayer2 = new Image();
        const rocket = new Image();
        const explosion = new Image();
        explosion.src = "./explosion.png";
        rocket.src = "./rocket.png";
        backgroundLayer.src = "./stitched.jpg"; // Adjust the path to your image
        backgroundLayer2.src = "./space.jpg";
        const flameArr = []
        flameArr[0] = new Image();
        flameArr[1] = new Image();
        flameArr[2] = new Image();
        flameArr[3] = new Image();
        flameArr[4] = new Image();
        flameArr[5] = new Image();
        flameArr[6] = new Image();
        flameArr[7] = new Image();
        flameArr[8] = new Image();
        flameArr[9] = new Image();
        flameArr[0].src="./flames/1.png";
        flameArr[1].src="./flames/2.png";
        flameArr[2].src="./flames/3.png";
        flameArr[3].src="./flames/4.png";
        flameArr[4].src="./flames/5.png";
        flameArr[5].src="./flames/6.png";
        flameArr[6].src="./flames/7.png";
        flameArr[7].src="./flames/8.png";
        flameArr[8].src="./flames/9.png";
        flameArr[9].src="./flames/10.png";
        let velocity = 4;
        let y = -10912; // total height = 1514, width = 300
        let y2 = -3592-10912; // initial placement minus initialpalcement for bottom
        let y3 = -3592-3592-10912;
        let rocketY = 650;
        let rocketVel = -0.8;
        let numberVel = 0.0001;
        let numberAccel = 0.000001;
        // let rocketHeight = rocket.height * 0.2;
        // let rocketWidth = rocket.width * 0.2;
        const getMultiplier = () => {
            let val = parseInt(Math.random() * 1000000);
            if (val < 1000) {
                //100x - 250x
                return 100 + Math.random() * 150;
            } else if (val < 5000) {
                //50x - 100x
                return 50 + Math.random() * 50;
            } else if (val < 20000) {
                //25x - 50x
                return 25 + Math.random() * 25;
            } else if (val < 60000) {
                // 10x - 25x
                return 10 + Math.random() * 15;
            } else if (val < 350000) {
                // 5x - 10x
                return 5 + Math.random() * 5;
            } else {
                // 1x - 5x
                return 1 + Math.random() * 4;
            }
        }
        let curFlameFrame = 0;

        const updateFlameCounter = () => {
            curFlameFrame++;
            curFlameFrame %= 10;
        }
        setInterval(updateFlameCounter, 35);

        let target = getMultiplier();
        function truncateToDecimals(num, dec = 2) {
            const calcDec = Math.pow(10, dec);
            return Math.trunc(num * calcDec) / calcDec;
        }

        let shouldStart = start;
        const animate = () => {
            ctx.clearRect(0, 0, width, height); // Clear the canvas
            ctx.drawImage(backgroundLayer, 0, y);
            ctx.drawImage(backgroundLayer2, 0, y2);
            ctx.drawImage(backgroundLayer2, 0, y3);
            ctx.font = "100px serif";
            ctx.textAlign = "center";
            ctx.fillStyle = "white";
            ctx.fillText(truncateToDecimals(number) + "x", 1200, 400);
            rocketY += rocketVel;
            if (number > target) {
                numberVel = 0;
                numberAccel = 0;
                ctx.drawImage(explosion, 1000, 600, 450, 450);
                if (shouldStart) {
                    updateStart(false);
                    shouldStart = false;
                    setBetAmount('');
                    setMessage('');
                    setIsSubmitted(false);
                }
            } else {
                ctx.drawImage(flameArr[curFlameFrame], 1100, rocketY + 300, 200, 200);
                ctx.drawImage(rocket, 1000, rocketY);
                if (rocketY < 500) {
                    rocketVel = 0;
                    number += numberVel;
                    setCurNumber(number);
                    numberVel += numberAccel;
                    y+=velocity;
                    y2+=velocity
                    y3+=velocity;
                    velocity += 0.01;
                }
                if (y2 > canvas.height) {
                    y2 = -5984; // 2 * initial placement - canvasHeight
                }
                if (y3 > canvas.height) {
                    y3 = -5984;
                }
            }
            requestAnimationFrame(animate);
        };

        if (shouldStart) {
            velocity = 4;
            y = -10912; // total height = 1514, width = 300
            y2 = -3592-10912; // initial placement minus initialpalcement for bottom
            y3 = -3592-3592-10912;
            rocketY = 650;
            rocketVel = -0.8;
            numberVel = 0.0001;
            numberAccel = 0.000001;
            number = 1;
            animate();
        }
    }
}, [start]);
return (user &&
    <div className="crash_main_window">
        <div className="crash_window">
            <canvas className="crash_container" ref={canvasRef}></canvas>
            <div className="betting-container">
                <input
                    type="number"
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                    placeholder="Enter bet amount"
                    step="0.01"
                    disabled={isSubmitted}
                />
                <div className="slider-container">
                    <input
                    type="range"
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                    min="0.01"
                    max={userMoney}
                    step="0.01"
                    disabled={isSubmitted}
                    className="slider"
                    />
                    <p className="slider-value">{betAmount}</p>
                </div>
                {(!isSubmitted) && 
                    <button className="submit_button" onClick={handleSubmit}>
                        Submit Bet
                    </button>
                }
                <p id="message" style={{ color: isSubmitted ? 'green' : 'white' }}>
                    {message}
                </p>
                {(isSubmitted && start && !cashedOut) && (
                    <button className="cashout" onClick={handleCashOut}>
                        Cash Out
                    </button>
                )}
            </div>
        </div>
        <div className="crash_explanation">
            <h1 className="crash_title">How Crash Works</h1>
            <p>Crash involves investing a given amount and cashing out before the rocket ship explodes</p>
            <p>If one is too late to cash out, all invested hybux will be lost</p>
            <p>Otherwise, the invested amount is multiplied by the cashed out multiplier</p>
        </div>
    </div>
)
};


export default CrashWindow;