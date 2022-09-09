import Enemy from './EnemyClass'

class EnemyTwo extends Enemy{
    constructor(gameWidth, gameHeight, image){
      super(gameWidth, gameHeight);
      this.speed = (Math.random() * 2 + 1)*this.speedModifier;
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.angle = Math.random() * 2;
      this.angleSpeed = Math.random() * 0.10;
      this.image = image;
      this.imageWidth = 1060;
      this.imageHeight = 958;
    }
    update(){
      this.x-= this.speed;
      this.y += Math.sin(this.angle) * 3;
      this.angle += this.angleSpeed;
      if(this.y < 0) this.y = 0;
      else if(this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height;
      // remove enemies
      if (this.x < 0 - this.width) this.markedForDeletion = true;
    }
  }

export default EnemyTwo