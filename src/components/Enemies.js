import EnemyOne from './EnemyOne'
import EnemyTwo from './EnemyTwo'
import EnemyThree from './EnemyThree'
import EnemyClass from './EnemyClass';

// Enemy class to add new enemy and hold all the enemies
let gameFrame = 1;

class Enemies extends EnemyClass {
  constructor(width, height, images) {
    super(width, height);
    this.gameWidth = width;
    this.gameHeight = height;
    this.enemies = [];
    this.enemyInterval = 2000; 
    this.enemyTimer = 0; 
    this.images = images

  }
  update() {
    // Deleting the enemy is passed the screen.
    this.enemies = this.enemies.filter(object => !object.markedForDeletion)
    // Timer is incremented throughout the animation, and when it's equal to enemyInterval, new enemy is added
    if (this.enemyTimer > this.enemyInterval) {
      this.#addNewEnemy();
      this.enemyTimer = 0;
    } else {
      this.enemyTimer += 10;
    }
    this.enemies.forEach(object => object.update())
    gameFrame++;
    if(gameFrame%2000 === 0 && this.enemyInterval > 800) this.enemyInterval -= 100
  }

  draw(ctx) {
    this.enemies.forEach(object => object.draw(ctx, object.image, object.imageWidth, object.imageHeight))
  }

  // function to add random enemy
  #addNewEnemy() {
    let randomEnemy = Math.random() * 6;
    if (randomEnemy < 3) this.enemies.push(new EnemyOne(this.gameWidth, this.gameHeight, this.images[0]));
    else if (randomEnemy < 5) this.enemies.push(new EnemyTwo(this.gameWidth, this.gameHeight, this.images[1]));
    else this.enemies.push(new EnemyThree(this.gameWidth, this.gameHeight, this.images[2]));

  }
}

export default Enemies