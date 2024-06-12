const canvas = document.getElementById('canvas1');
const ctx = document.getContext('2d');
const width = canvas.width;
const height = canvas.height;
let gameSpeed = 5;

const backgroundLayer = new Image();
backgroundLayer.src = "./././assets/stitched.jpg";

function animate(){
    ctx.drawImage(backgroundLayer, 0, 0);
    requestAnimationFrame(animate);
};

animate();
