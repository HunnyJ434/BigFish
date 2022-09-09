import Enemy from './EnemyClass'

class EnemyThree extends Enemy{
    constructor(gameWidth, gameHeight, image){
      super(gameWidth, gameHeight);
      this.speed = (Math.random() * 5 + 2)*this.speedModifier;
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.newX = Math.random() * 1000;
      this.newY = Math.random() * 600;
      this.image = image;
      this.imageWidth = 1044;
      this.imageHeight = 840;
    }
    update(){
      if(this.gameFrame % 130 === 0){
        this.newX = Math.random() * 1000;
        this.newY = Math.random() * 600;
  
      }
      let dx = Math.abs(this.x - this.newX);
      let dy = this.y - this.newY;
      this.x -= (dx/170);
      this.y -= (dy/120);
      if(this.y < 0) this.y = 0;
      else if(this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height;
      // remove enemies
      if (this.x < 0 - this.width) this.markedForDeletion = true;
    }
  }

  export default EnemyThree