let speed = 1;

// Main Enemy class for setting each enemy speed, width, height, and also to draw it.
class EnemyClass {
  constructor(gameWidth, gameHeight) {
    this.frameX = 0;
    this.speedModifier = speed;
    this.gameFrame = 0;
    this.width = Math.random() * 150 + 20;
    this.height = this.width;
    this.x = gameWidth;
    this.y = Math.random() * (gameHeight - this.height);
    this.markedForDeletion = false;
  }

  draw(ctx, image, imageWidth, imageHeight) {
    this.gameFrame++;
    if (this.gameFrame % 15 === 0) {
      if (this.frameX < 7) this.frameX++
      else this.frameX = 0;
    }
    // increasing speed of enemies every 1000 frame
    if (this.gameFrame % 1000 === 0) {
      speed += 0.05;
    }
    ctx.strokeStyle = 'white';
    ctx.drawImage(image, this.frameX * imageWidth, 0, imageWidth, imageHeight, this.x, this.y, this.width, this.height);
  }
}

export default EnemyClass