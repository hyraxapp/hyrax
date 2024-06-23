import React, { useEffect, useState, useRef } from 'react';
import {getMoney, updateMoney, getTickets, updateTickets} from '../../actions/posts';
import './PlinkoWindow.css';
import { ReactP5Wrapper } from "@p5-wrapper/react";
import { TimerSharp } from '@mui/icons-material';
var Matter = require('matter-js');


var particles = [];
var vel = 2;
var accel = -0.1;
var origY = -1;
var luckyIndex = -1;
var hit = false;
var winnings = 0;
const PlinkoWindow = () => {
const user = JSON.parse(localStorage.getItem("profile"));
const [shouldStart, updateShouldStart] = useState(false);
const [betAmount, setBetAmount] = useState('');
const [numPlinkos, setNumPlinkos] = useState(1);
const [userMoney, setUserMoney] = useState('');
const [userTickets, setUserTickets] = useState(25);
const [message, setMessage] = useState('');
const [isSubmitted, setIsSubmitted] = useState(false);
const [gameOver, setGameOver] = useState(true);
const canvasRef = useRef(null);
var Engine = Matter.Engine, World = Matter.World, Bodies = Matter.Bodies;

var engine = Engine.create();
var world = engine.world;
world.gravity.y = 1;
var plinkos = [];
var multis = [];
var boundaries = [];
var frameCount = 0;
var rows = 14;
var multipliers = ['170x', '24x', '8.1x', '2x', '1x', '0.7x', '0.5x', '0.2x', '0.5x', '0.7x', '1x', '2x', '8.1x', '24x', '170x'];
var multiVals = [170, 24, 8.1, 2, 1, 0.7, 0.5, 0.2, 0.5, 0.7, 1, 2, 8.1, 24, 170];

const handleSubmit = async () => {
    const amount = parseFloat(betAmount);
    let tuserMoney = await getMoney(user?.result?._id);
    let userMoney = parseFloat(tuserMoney.money.$numberDecimal);
    let numTickets = await getTickets(user?.result?._id);
    let userTickets = numTickets.tickets;
    let plinkoCnt = parseInt(numPlinkos);
    // Clear previous messages
    setMessage('');

    if (isNaN(amount) || amount < 1) {
        setMessage('Please enter a valid decimal amount. (Minimum investment 1)');
    } else if (amount * plinkoCnt > userMoney) {
        setMessage('You do not have enough money to place this investment.');
    } else if (userTickets < numPlinkos) {
        setMessage('You do not have enough tickets to place a investment.');
    } else if (numPlinkos > 25) {
        setMessage('Max number of chips allowed is 25');
    } else {
        setMessage('Investment placed successfully!');
        await updateTickets(user?.result?._id, -1 * numPlinkos);
        await updateMoney(user?.result?._id, -1 * amount * numPlinkos);
        setIsSubmitted(true);
        winnings = 0;
        setGameOver(false);
        updateShouldStart(true);
    }
};

useEffect(() => {
    const retrieveMoney = async() => {
        let tuserMoney = await getMoney(user?.result?._id);
        let userMoney = parseFloat(tuserMoney.money.$numberDecimal);
        let numTickets = await getTickets(user?.result?._id);
        let userTickets = numTickets.tickets;
        setUserTickets(userTickets);
        setUserMoney(userMoney);
    }
    if (user) {
        retrieveMoney();
    }
})

const handleHitBottom = async(multi, last) => {
    winnings += multi * parseFloat(betAmount);
    if (last) {
        await updateMoney(user?.result?._id, winnings);
    }
}

const sketch = (p5) => {
    const playDing = () => {
        // var sound = new Audio('./ding.mp3');
        // sound.volume = 0.2;
        // sound.play();
    }
    var ballCategory = 0x0001;
    var pegCategory = 0x0002;
    var boundaryCategory = 0x0004;
    var multiCategory = 0x0008;

    p5.setup = () => {
        p5.createCanvas(800, 600);
        // Function to animate multiplier with a spring-like motion
        function animateMultiplier(multiplier) {
            var originalPositionY = multiplier.position.y;
            var compressionDistance = 10; // Adjust as needed for the animation effect
            var animationFrames = 60; // Number of frames for the animation
            var animationTime = 500; // Duration of the animation in milliseconds
        
            var frame = 0;
            var animationInterval = setInterval(function() {
                frame++;
        
                // Calculate animation progress (t) from 0 to 1
                var t = frame / animationFrames;
        
                // Apply a sinusoidal easing function for smooth animation
                var animationProgress = Math.sin(t * Math.PI);
        
                // Calculate new position based on original position and animation progress
                var newPositionY = originalPositionY + compressionDistance * animationProgress;
        
                // Update multiplier position
                Matter.Body.setPosition(multiplier, { x: multiplier.position.x, y: newPositionY });
        
                // Check if animation is complete
                if (frame >= animationFrames) {
                    clearInterval(animationInterval);
        
                    // Reset multiplier to original position after a short delay
                    setTimeout(function() {
                        Matter.Body.setPosition(multiplier, { x: multiplier.position.x, y: originalPositionY });
                    }, 500); // Adjust reset delay as needed
                }
            }, animationTime / animationFrames);
        }

        function collision(event) {
            var pairs = event.pairs;
            for (var i = 0; i < pairs.length; i++) {
                var labelA = pairs[i].bodyA.label;
                var labelB = pairs[i].bodyB.label;
                if ((labelA == 'peg' && labelB == 'plinko') || (labelA == 'plinko' && labelB == 'peg')) {
                    playDing();
                } else if ((labelA == 'multi' && labelB == 'plinko') || (labelB == 'multi' && labelA == 'plinko')) {
                    var ball;
                    var box;
                    if (labelA == 'multi') {
                        ball = pairs[i].bodyB;
                        box = pairs[i].bodyA;
                    } else {
                        ball = pairs[i].bodyA;
                        box = pairs[i].bodyB;
                    }
                    var index = particles.findIndex((plinko) => plinko.body.id == ball.id);
                    particles.splice(index, 1);
                    World.remove(world, ball);
                    handleHitBottom(box.multiplier, particles.length == 0);
                    animateMultiplier(box);
                }
            }
        }
        Matter.Events.on(engine, 'collisionStart', collision);
        var width = 800;
        var spacing = 35;
        var offset = 70;
        var pegCnt = 3;
        for (var i = 0; i < rows; i++) {
            var start = (width - spacing * (pegCnt - 1)) / 2;
            for (var j = 0; j < pegCnt; j++) {
                var x = start + spacing * j;
                var y = offset + i * spacing;
                var p = new Peg(x, y, 6);
                plinkos.push(p);
            }
            pegCnt++;
        }
        var b = new Boundary(400, 570, [{x: 10, y: 570}, {x: 790, y: 570}, {x: 790, y: 580}, {x: 10, y: 580}], true);
        var leftWall = new Boundary(242, 290, [{x: 372.5, y: 0}, {x: 102.5, y: 570}, {x: 100, y: 570}, {x: 370, y: 0}], false);
        var rightWall = new Boundary(558, 290, [{x: 417.5, y: 0}, {x: 697.5, y: 570}, {x: 700, y: 570}, {x: 420, y: 0}], false);
        var start = (width - spacing * (pegCnt - 2)) / 2; 
        var botOffset = 25;
        var sideLength = spacing - 5;
        var bot = offset + (rows - 1) * spacing;
        for (var i = 0; i < rows + 1; i++) {
            var x = start + i * spacing + spacing / 2;
            var y = bot + botOffset;
            var multi = new Multi(x, y, sideLength, sideLength, multipliers[i], multiVals[i]);
            multis.push(multi); 
        }
    }
    
    class Boundary {
        constructor (x, y, vertices, visible) {
            var options = {
                isStatic: true,
                restitution: 0.5,
                friction: 0
            };
            this.visible = visible;
            this.body = Bodies.fromVertices(x, y, vertices, options);
            this.body.collisionFilter.category = boundaryCategory;
            this.body.collisionFilter.mask = ballCategory;
            World.add(world, this.body);
        }
        show = () => {
            if (this.visible) {
                p5.fill(255);
                p5.stroke(255);
            }
            var pos = this.body.position;
            p5.push();
            // p5.translate(pos.x, pos.y);
            p5.beginShape();
            for (var i = 0; i < this.body.vertices.length; i++) { 
                var v = this.body.vertices[i];
                p5.vertex(v.x, v.y);
            }
            p5.endShape();
            p5.pop();
        }
    }
    
    class Multi {
        constructor (x, y, w, h, text, multiplier) {
            var options = {
                isStatic: true,
                restitution: 0.5,
                friction: 0
            };
            this.text = text;
            this.w = w;
            this.h = h;
            this.body = Bodies.rectangle(x, y, w, h, options);
            this.body.collisionFilter.category = multiCategory;
            this.body.collisionFilter.mask = ballCategory;
            this.body.label = "multi";
            this.body.multiplier = multiplier;
            World.add(world, this.body);
        }
        show = () => {
            p5.fill(212, 69, 38);
            p5.stroke(255);
            var pos = this.body.position;
            p5.push();
            p5.translate(pos.x, pos.y);
            p5.rectMode(p5.CENTER);
            p5.rect(0, 0, this.w, this.h, 5);
            p5.fill(0);
            p5.stroke(0);
            p5.textAlign(p5.CENTER);
            p5.text(this.text, 0, 0);
            p5.pop();
        }
    }

    class Peg {
        constructor (x, y, r) {
            var options = {
                isStatic: true,
                restitution: 0.5,
                friction: 0
            };
            this.body = Bodies.circle(x, y, r, options);
            this.body.collisionFilter.category = pegCategory;
            this.body.collisionFilter.mask = ballCategory;
            this.body.label = "peg";
            this.r = r;
            World.add(world, this.body);
        }
        show = () => {
            p5.fill(255);
            p5.stroke(255);
            var pos = this.body.position;
            p5.push();
            p5.translate(pos.x, pos.y);
            p5.ellipse(0, 0, this.r * 2);
            p5.pop();
        }
    }

    class Plinko {
        constructor (x, y, r) {
            var options = {
                restitution: 0.5,
                friction: 0,
            };
            this.body = Bodies.circle(x, y, r, options);
            this.body.collisionFilter.category = ballCategory;
            this.body.collisionFilter.mask = pegCategory | boundaryCategory | multiCategory;
            this.body.label = "plinko";
            this.r = r;
            World.add(world, this.body);
        }
        show = () => {
            p5.fill(255, 0, 0);
            p5.stroke(255, 0, 0);
            var pos = this.body.position;
            p5.push();
            p5.translate(pos.x, pos.y);
            p5.ellipse(0, 0, this.r * 2);
            p5.pop();
        }
        
        offscreen = () => {
            var y = this.body.position.y;
            return (y > 525);
        }
    }
    var once = shouldStart;
    particles = [];
    p5.draw = () => {
        p5.background(16, 32, 45);
        Engine.update(engine);
        if (once) {
            once = false;
            for (var i = 0; i < numPlinkos; i++) {
                var horizOffset = Math.random() * 1.6 - 0.8;
                var p = new Plinko(400 + horizOffset, 30, 10);
                particles.push(p);
            }
        }
        if (particles.length == 0 && !gameOver) {
            setGameOver(true);
            updateShouldStart(false);
            setIsSubmitted(false);
            setBetAmount('');
            setNumPlinkos(1);
            setMessage('');
        }
        for (var i = 0; i < particles.length; i++) {
            particles[i].show();
        }
        for (var i = 0; i < plinkos.length; i++) {
            plinkos[i].show();
        }
        for (var i = 0; i < multis.length; i++) {
            multis[i].show();
        }
        frameCount++;
    };
};

return (user &&
    <div className="plinko_main_window">
        <div className="plinko_window">
            {/* <canvas className="plinko_container" ref={canvasRef}></canvas> */}
            <ReactP5Wrapper sketch={sketch}/>
            <div className="betting-container">
                <input
                    type="number"
                    value={numPlinkos}
                    onChange={(e) => setNumPlinkos(e.target.value)}
                    placeholder="Enter Number of Chips"
                    step="0.01"
                    min="1"
                    disabled={isSubmitted}
                />
                <div className="slider-container">
                    <input
                    type="range"
                    value={numPlinkos}
                    onChange={(e) => setNumPlinkos(e.target.value)}
                    min="1"
                    max={Math.min(userTickets, 25)}
                    step="1"
                    disabled={isSubmitted}
                    className="slider"
                    />
                    <p className="slider-value"></p>
                </div>
                <input
                    type="number"
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                    placeholder="Enter investment amount"
                    step="0.01"
                    disabled={isSubmitted}
                />
                <div className="slider-container">
                    <input
                    type="range"
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                    min="0.01"
                    max={userMoney/parseInt(numPlinkos)}
                    step="0.01"
                    disabled={isSubmitted}
                    className="slider"
                    />
                    <p className="slider-value"></p>
                </div>
                {(!isSubmitted && gameOver) && 
                    <button className="submit_button" onClick={handleSubmit}>
                        Submit Investment
                    </button>
                }
                <p id="message" style={{ color: isSubmitted ? 'green' : 'white' }}>
                    {message}
                </p>
            </div>
        </div>
        <div className="plinko_explanation">
            <h1 className="plinko_title">How Plinko Works</h1>
            <p>Plinko involves investing a given amount and dropping a chip down the board</p>
            <p>Whichever number the chip lands on is the amount the invested hybux is multiplied by</p>
            <p>DISCLAIMER: If chip does not hit the bottom, user will lose all money (i.e. refreshing mid game)</p>
        </div>
    </div>
)
};


export default PlinkoWindow;