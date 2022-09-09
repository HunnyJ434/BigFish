import Enemy from './EnemyClass'

class EnemyOne extends Enemy{
    constructor(gameWidth, gameHeight, image){
      super(gameWidth, gameHeight);
      this.speed = (Math.random()*2 + 1)*this.speedModifier;
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.image = image;
      this.imageWidth = 1240;
      this.imageHeight = 970;
    }
    update(){
      this.x-= this.speed;
      // remove enemies
      if (this.x < 0 - this.width) this.markedForDeletion = true;
    }
  }

export default EnemyOne