import React, { useEffect, useState, useRef } from 'react';
import {getMoney, updateMoney, getTickets, updateTickets} from '../../actions/posts';
import './PlinkoWindow.css';
import { ReactP5Wrapper } from "@p5-wrapper/react";
var Matter = require('matter-js');


var particles = [];
var vel = 2;
var accel = -0.1;
var origY = -1;
var luckyIndex = -1;
var hit = false;
const PlinkoWindow = () => {
const user = JSON.parse(localStorage.getItem("profile"));
const [shouldStart, updateShouldStart] = useState(false);
const [betAmount, setBetAmount] = useState('');
const [numPlinkos, setNumPlinkos] = useState('');
const [userMoney, setUserMoney] = useState('');
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
var frameCount = 0;
var rows = 14;
var multipliers = ['170x', '24x', '8.1x', '2x', '1x', '0.7x', '0.5x', '0.2x', '0.5x', '0.7x', '1x', '2x', '8.1x', '24x', '170x'];
var multiVals = [170, 24, 8.1, 2, 1, 0.7, 0.5, 0.2, 0.5, 0.7, 1, 2, 8.1, 24, 170];

const handleSubmit = async () => {
    const amount = parseFloat(betAmount);
    let tuserMoney = await getMoney(user?.result?._id);
    let userMoney = parseFloat(tuserMoney.money.$numberDecimal);
    let numTickets = await getTickets(user?.result?._id);
    let userHasTicket = parseInt(numTickets.tickets) > 0;
    // Clear previous messages
    setMessage('');

    if (isNaN(amount) || amount <= 1) {
        setMessage('Please enter a valid decimal amount. (Minimum bet 1)');
    } else if (amount > userMoney) {
        setMessage('You do not have enough money to place this bet.');
    } else if (!userHasTicket) {
        setMessage('You do not have a ticket to place a bet.');
    } else {
        setMessage('Bet placed successfully!');
        await updateTickets(user?.result?._id, -1);
        await updateMoney(user?.result?._id, -1 * amount);
        setIsSubmitted(true);
        setGameOver(false);
        updateShouldStart(true);
    }
};

useEffect(() => {
    const retrieveMoney = async() => {
        let tuserMoney = await getMoney(user?.result?._id);
        let userMoney = parseFloat(tuserMoney.money.$numberDecimal);
        setUserMoney(userMoney);
        console.log(userMoney);
    }
    retrieveMoney();
})

const handleHitBottom = async(multi) => {
    await updateMoney(user?.result?._id, multi * parseFloat(betAmount));
}

const sketch = (p5) => {
    const playDing = () => {
        var sound = new Audio('./ding.mp3');
        sound.volume = 0.2;
        sound.play();
    }

    p5.setup = () => {
        p5.createCanvas(800, 600);
        function collision(event) {
            var pairs = event.pairs;
            for (var i = 0; i < pairs.length; i++) {
                var labelA = pairs[i].bodyA.label;
                var labelB = pairs[i].bodyB.label;
                if ((labelA == 'peg' && labelB == 'plinko') || (labelA == 'plinko' && labelB == 'peg')) {
                    playDing();
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
            var multi = new Multi(x, y, sideLength, sideLength, multipliers[i]);
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
        constructor (x, y, w, h, text) {
            var options = {
                isStatic: true,
                restitution: 0.5,
                friction: 0
            };
            this.text = text;
            this.w = w;
            this.h = h;
            this.body = Bodies.rectangle(x, y, w, h, options);
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
                friction: 0
            };
            this.body = Bodies.circle(x, y, r, options);
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
            var horizOffset = Math.random() * 2 - 1;
            var p = new Plinko(400 + horizOffset, 30, 10);
            particles.push(p);
            hit = false;
            vel = 1
        }
        if (hit) {
            multis[luckyIndex].body.position.y += vel;
            vel += accel;
            if (multis[luckyIndex].body.position.y <= origY) {
                multis[luckyIndex].body.position.y = origY;
                hit = false;
                setGameOver(true);
                updateShouldStart(false);
                setIsSubmitted(false);
                setBetAmount('');
                setMessage('');
            }
        }
        for (var i = 0; i < particles.length; i++) {
            particles[i].show();
        }
        for (var i = 0; i < plinkos.length; i++) {
            plinkos[i].show();
        }
        console.log(particles);
        for (var i = 0; i < multis.length; i++) {
            multis[i].show();
            if (particles?.length) {
                if (Matter.Collision.collides(particles[0].body, multis[i].body)) {
                    console.log("COLLIDE");
                    console.log(particles);
                    World.remove(world, particles[0].body);
                    particles.splice(0, 1);
                    origY = multis[i].body.position.y;
                    hit = true;
                    luckyIndex = i;
                    handleHitBottom(multiVals[i]);
                }
            }
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
                {(!isSubmitted && gameOver) && 
                    <button className="submit_button" onClick={handleSubmit}>
                        Submit Bet
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
        </div>
    </div>
)
};


export default PlinkoWindow;