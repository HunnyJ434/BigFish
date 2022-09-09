import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import Enemies from './Enemies'

const keys = [];
let gameFrame = 0; // gameFrame is incremented infinitely throughout the game and is used to update few things during certain interval.
let gameOver = false;
let score = 0;
let life = 3;




// To display the Score and Life
function displayStatus(context) {
  context.fillStyle = "black";
  context.font = "40px Inter"
  context.fillText("Score: " + score, 20, 50);
  context.fillText("Life: " + life, 1170, 50);
}

// looking for keyboard events
window.addEventListener('keydown', e => {
  if ((e.key === "ArrowDown" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight") &&
      keys.indexOf(e.key) === -1)
      {
        keys.push(e.key); // event key is added to keys array when keyboard key is pressed
      }
});
window.addEventListener('keyup', e => {
  if ((e.key === "ArrowDown" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight")) 
      {
      keys.splice(keys.indexOf(e.key), 1); // event key is removed from keys array when keyboard key is not pressed anymore
      }
});


class PlayerDesign {
  constructor(gameWidth, gameHeight, image) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.invincibility = 10;
    this.width = 75;
    this.height = 75;
    this.x = 0; // x-axis on screen where the player image will be drawn
    this.y = gameHeight - this.height; // y-axis on screen where the player image will be drawn
    this.image = image;
    this.frameX = 0; // to give animation to the player sprite.
    this.speedX = 0; // WIll be used to update x to imitate movement on x-axis
    this.speedY = 0; // WIll be used to update y to imitate movement on y-axis
  }
  update() {

    // depending keyboard event listener, which uses keys array, speedX and speedY are decided
    if (keys.indexOf('ArrowRight') > -1) {
      this.speedX = 3;
    } else if (keys.indexOf('ArrowLeft') > -1) {
      this.speedX = -3;
    } else if (keys.indexOf('ArrowUp') > -1) {
      this.speedY = -3;
    } else if (keys.indexOf('ArrowDown') > -1) {
      this.speedY = 3;
    } else {
      this.speedX = 0;
      this.speedY = 0;
    }
    // changing the value of x and y, using speedX and speedY, imitate the movement of player on the Canvas.
    this.x += this.speedX; 
    this.y += this.speedY;

    this.withinWindow(); // to make sure player does not go out of screen.

    //to give animation to the player sprite.
    if (gameFrame % 10 === 0) {
      if (this.frameX < 5) this.frameX++
      else this.frameX = 0;

      // Making player temporarily invincible after being respwaned
      if (this.invincibility > 0) this.invincibility--;
    }
  }
  draw(context) {
    if (this.invincibility % 2 === 0) context.drawImage(this.image, this.frameX * 256, 0, 256, 256, this.x, this.y, this.width, this.height);
  }

  withinWindow() {
    if (this.x < 0) this.x = 0;
    else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width;
    if (this.y < 0 - this.height/3) this.y = 0 - this.height/3;
    else if (this.y - this.height/3 > this.gameHeight - this.height) this.y = this.gameHeight - this.width + this.height/3;
  }
}

const Player = ({height,width}) => {

  // Initiating Player's Character
  const playerImg = new Image();
  playerImg.src = require("..//Images/fish.png");
  const player = new PlayerDesign(width, height, playerImg)
  // Initiating Enemies
  const img1 = new Image();
  img1.src = require("..//Images/enemy/e1.png");
  const img2 = new Image();
  img2.src = require("..//Images/enemy/e2.png");
  const img3 = new Image();
  img3.src = require("..//Images/enemy/e3.png");
  const img = [img1, img2, img3]
  const enemies = new Enemies(width, height, img)

  const gameOverImg = new Image();
  gameOverImg.src = require("..//Images/gameOver.png");
  const winImg = new Image();
  winImg.src = require("..//Images/youWin.png");

  // Setting up Canvas
  const canvas = React.useRef();

  React.useEffect(() => {
    const startBtn = document.querySelector(".newGame");
    const objective = document.querySelector(".objective");
    const objectiveBtn = document.querySelector(".objectiveBtn");
    objective.addEventListener("click", () => {
      const objectiveDiv = document.querySelector(".objectiveDiv");
      objectiveDiv.style.display = "block";
      startBtn.style.display = "none";
      objective.style.display = "none";
    })
    objectiveBtn.addEventListener("click", () => {
      const objectiveDiv = document.querySelector(".objectiveDiv");
      objectiveDiv.style.display = "none";
      startBtn.style.display = "block";
      objective.style.display = "block";
    })
    startBtn.addEventListener('click', () => {
      animate();
      startBtn.style.display = "none";
      objective.style.display = "none";
      })
  });

  function animate() {

    // Collision Detection
    enemies.enemies.forEach(enemy => {
      const dx = enemy.x - player.x;
      const dy = enemy.y - player.y;
      const distance = Math.sqrt(dx * dx + dy * dy);  // calculating the distance between player and enemy

      if (distance < (enemy.width / 2) + (player.width / 2)) { // Collision detected
        if (player.width * player.height > enemy.width * enemy.height) { // when Player sprite is bigger than enemy 
          enemy.markedForDeletion = true;
          player.width += enemy.width * 0.05;
          player.height += enemy.height * 0.05;
          score += Math.floor(enemy.width / 2);
        } 
        else if (player.invincibility === 0) { // When enemy is bigger
          if (life === 0) gameOver = true;
          else life--;
          player.invincibility = 10;
          player.x = 0;
          player.y = height / 2;
          player.width = 75;
          player.height = 75;

        }
      }
    })

    const context = canvas.current.getContext('2d');
    context.clearRect(0, 0, width, height);
    player.draw(context);
    player.update();
    enemies.draw(context);
    enemies.update();
    gameFrame++;
    displayStatus(context);
    if(score > 1500){
      gameOver = true;
      context.drawImage(winImg, 0,0 , width, height);
      context.fillStyle = "white";
      context.font = "40px Inter"
      context.fillText("Press Enter to Play again.", 420, 350);
      playAgain();
    }
    if (!gameOver) {
      requestAnimationFrame(animate)
    }
    else if(score<1500){ // when game is over
      context.drawImage(gameOverImg, width / 4, height / 4, width / 2, height / 2);
      context.fillStyle = "white";
      context.font = "40px Inter"
      context.fillText("Press Enter to Play again.", 420, 440);
      playAgain();
    }
  }

  function playAgain(){
    window.addEventListener('click', () => {
      if(gameOver){
      gameOver = false;
      player.x = 0;
      player.y = player.gameHeight - player.height; 
      life = 3;
      player.invincibility = 10;
      score = 0;
      player.width = 75;
      player.height = 75;
      gameFrame = 0;
      animate();
      }
    })
    window.addEventListener('keypress', e => {
      if (e.key === "Enter" && gameOver) {
        gameOver = false;
        player.x = 0;
        player.y = player.gameHeight - player.height; 
        life = 3;
        player.invincibility = 10;
        score = 0;
        player.width = 75;
        player.height = 75;
        gameFrame = 0;
        animate();
      }
    })
  }

  
  return ( 
    <canvas ref = {canvas} className = "player1" height = {height} width = {width}/>
    )
};

Player.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};
export default Player;
