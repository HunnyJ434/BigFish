import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

let gameSpeed = 5;
let gameFrame = 1;
let backgroundSelector = 1;


class Layer {
  constructor(image, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.width = 1920;
    this.height = 600;
    this.x2 = this.width;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = gameSpeed * speedModifier;
  }
  update() {
    if (this.x <= -this.width) {
      this.x = this.width + this.x2 - this.speed;
    }
    if (this.x2 <= -this.width) {
      this.x2 = this.width + this.x - this.speed;
    }
    this.x = Math.floor(this.x - this.speed);
    this.x2 = Math.floor(this.x2 - this.speed);
    if (gameFrame % 2000 === 0 && this.speed < 8) {
      this.speed += 0.05;
    }

  }
  updateImage(image) {
    this.image = image;
  }
  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    context.drawImage(this.image, this.x2, this.y, this.width, this.height);

  }
}

const Background = ({height,width}) => {
  const canvas = React.useRef();
  React.useEffect(() => {
    animate();
  });

  const img1 = new Image();
  const img2 = new Image();
  const img3 = new Image();
  const img4 = new Image();
  const img5 = new Image();
  const img6 = new Image();
  const img7 = new Image();
  const img8 = new Image();
  img1.src = require(`..//Images/background/${backgroundSelector}/1.png`);
  img2.src = require(`..//Images/background/${backgroundSelector}/2.png`);
  img3.src = require(`..//Images/background/${backgroundSelector}/3.png`);
  img4.src = require(`..//Images/background/${backgroundSelector}/4.png`);
  img5.src = require(`..//Images/background/${backgroundSelector}/5.png`);
  img6.src = require(`..//Images/background/${backgroundSelector}/6.png`);
  img7.src = require(`..//Images/background/${backgroundSelector}/7.png`);
  img8.src = require(`..//Images/background/${backgroundSelector}/8.png`);
  const layer1 = new Layer(img1, 0.3)
  const layer2 = new Layer(img2, 0.4)
  const layer3 = new Layer(img3, 0.5)
  const layer4 = new Layer(img4, 0.6)
  const layer5 = new Layer(img5, 0.7)
  const layer6 = new Layer(img6, 0.8)
  const layer7 = new Layer(img7, 0.9)
  const layer8 = new Layer(img8, 1)
  let gameObjects = [layer1, layer2, layer3, layer4, layer5, layer6, layer7, layer8]


  function animate() {
    const context = canvas.current.getContext('2d');
    context.clearRect(0, 0, 1920, 600);
    gameObjects.forEach((layer) => {
      layer.update();
      layer.draw(context);
    })
    gameFrame++;
    if (gameFrame % 10000 === 0 && backgroundSelector < 3) {
      backgroundSelector++;
      updateBackground();
    }
    else if(gameFrame % 10000 === 0){
      backgroundSelector -= 2;
      updateBackground();
    }
    requestAnimationFrame(animate);


    function updateBackground() {
      img1.src = require(`..//Images/background/${backgroundSelector}/1.png`);
      img2.src = require(`..//Images/background/${backgroundSelector}/2.png`);
      img3.src = require(`..//Images/background/${backgroundSelector}/3.png`);
      img4.src = require(`..//Images/background/${backgroundSelector}/4.png`);
      img5.src = require(`..//Images/background/${backgroundSelector}/5.png`);
      img6.src = require(`..//Images/background/${backgroundSelector}/6.png`);
      img7.src = require(`..//Images/background/${backgroundSelector}/7.png`);
      img8.src = require(`..//Images/background/${backgroundSelector}/8.png`);
      layer1.updateImage(img1)
      layer2.updateImage(img2)
      layer3.updateImage(img3)
      layer4.updateImage(img4)
      layer5.updateImage(img5)
      layer6.updateImage(img6)
      layer7.updateImage(img7)
      layer8.updateImage(img8)
    }
  }

  return ( 
    <canvas ref = {canvas} className = "background1" height = {height} width = {width}/>
  )
};

Background.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};
export default Background;
