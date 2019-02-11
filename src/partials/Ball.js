import { SVG_NS, PADDLE_VALUES } from '../settings';

export class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;

    this.resetBall();
    
  }

  instantiateDirection() {
    this.vy = Math.floor(Math.random() * 10 - 5);
    if (this.vy === 0) {
      this.instantiateDirection();
    }
    this.vx = this.direction * (6 - Math.abs(this.vy));
    // console.log(this.vy);
    // console.log(this.vx);
  }

  resetBall() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;
    this.instantiateDirection();
  }

  wallCollision() {
    if (this.y - this.radius <= 0 || this.y + this.radius >= this.boardHeight) {
      this.vy *= -1;
    } 
  }
  
  paddleCollision(player1, player2) {

    const halfPaddleWidth = PADDLE_VALUES.paddleWidth / 2;
    const halfPaddleHeight = PADDLE_VALUES.paddleHeight / 2;

    let relPaddle = player2

    if (this.vx < 0) {
      relPaddle = player1;
    } 
    const distX = Math.abs(this.x - (relPaddle.x + halfPaddleWidth));
    const distY = Math.abs(this.y - (relPaddle.y + halfPaddleHeight));
    if (distX <= (halfPaddleWidth + this.radius)) {
      if (distY <= (halfPaddleHeight + this.radius)) {



        if (distY >= halfPaddleHeight) {
          const cornerDistX = Math.abs(distX - halfPaddleWidth);
          const cornerDistY = Math.abs(distY - halfPaddleHeight);
          
          console.log(`${cornerDistX} : ${cornerDistY}`);
          console.log(Math.pow(cornerDistX, 2) + Math.pow(cornerDistY, 2));
          console.log(Math.pow(this.radius, 2));

          if ((Math.pow(cornerDistX, 2) + Math.pow(cornerDistY, 2)) <= Math.pow(this.radius, 2)) {
            this.vx *= -1;
          }
        } else {
          this.vx *= -1;
        }
      }
    }
  }

  ballMovement() {
    this.x += this.vx * 2 / 3;
    this.y += this.vy * 2 / 3;
  }

  goal(player) {
    player.score++;
    this.resetBall();
  }

  goalDetection(player1, player2) {
    const rightGoal = this.x - this.radius < 0;
    const leftGoal = this.x + this.radius > this.boardWidth
    if (rightGoal) {
      this.direction = 1;
      this.goal(player1);
    } else if (leftGoal) {
      this.direction = -1;
      this.goal(player2);
    }
  }

  render(svg, player1, player2) {
    this.ballMovement();
    this.wallCollision();
    this.paddleCollision(player1, player2);

    let pongBall = document.createElementNS(SVG_NS, 'circle');
    pongBall.setAttributeNS(null, 'cx', this.x);
    pongBall.setAttributeNS(null, 'cy', this.y);
    pongBall.setAttributeNS(null, 'r', this.radius);
    pongBall.setAttributeNS(null, 'fill', 'black');

    svg.appendChild(pongBall);

    this.goalDetection(player1, player2);
    // console.log(this.y);
    // console.log(this.x);
  }
}

