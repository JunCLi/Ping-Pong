import { SVG_NS, PADDLE_VALUES } from '../settings';

export class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
    this.baseSpeedMagnifier = 1 / 2;

    this.speedMagnifier = this.baseSpeedMagnifier * 1.5;
    this.paddleHitMuliplier = 2.5;

    this.resetBall();
    
  }

  instantiateDirection() {
    this.vy = Math.floor(Math.random() * 6 - 3);
    if (this.vy === 0) {
      this.instantiateDirection();
    }
    this.vx = this.direction * 4;
  }

  resetBall() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;
    this.speedMagnifier = this.baseSpeedMagnifier;
    this.instantiateDirection();
  }

  wallCollision() {
    if (this.vy < 0) {
      if (this.y - this.radius <= 0) {
        this.vy *= -1;
      }
    } else {
      if (this.y + this.radius >= this.boardHeight) {
        this.vy *= -1;
      }
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

    if (distX <= (halfPaddleWidth + this.radius) && distY <= (halfPaddleHeight + this.radius)) {

      const cornerDist = Math.pow(Math.abs(distX - halfPaddleWidth), 2) + Math.pow(Math.abs(distY - halfPaddleHeight), 2);

      if (distY <= halfPaddleHeight || cornerDist >= Math.pow(this.radius, 2)) {
        this.paddleCollisionPhysics(relPaddle, halfPaddleWidth, halfPaddleHeight);
      }
    }
  }

  paddleCollisionPhysics(relPaddle, halfPaddleWidth, halfPaddleHeight) {
    if (this.speedMagnifier > 3 * this.baseSpeedMagnifier) {
      this.speedMagnifier = 3 * this.baseSpeedMagnifier
    } else {
      this.speedMagnifier *= this.paddleHitMuliplier;
    }

    const padY = (this.y - (relPaddle.y + halfPaddleHeight))

    if (this.x < PADDLE_VALUES.boardGap + halfPaddleWidth || this.x > this.boardWidth - PADDLE_VALUES.boardGap - halfPaddleWidth) {
      this.vy *= -1.25;
      this.vx *= 0.75;
      return;
    } else {
      
      this.vx *= -1;

      if (Math.abs(this.vy + padY / 10) < 3) {
        this.vy += padY / 5 ;
      } else {
        if (this.vy > 0) {
          this.vy = 3;
        } else {
          this.vy = -3;
        }
      }
    }
  }

  ballAcceleration() {
    console.log(this.speedMagnifier);
    const speedDiff = this.speedMagnifier - this.baseSpeedMagnifier;
    if (speedDiff * 100 > 1) {
      this.speedMagnifier -= speedDiff / 75;
    } else {
      this.speedMagnifier = this.baseSpeedMagnifier;
    }
  }

  ballMovement() {
    this.ballAcceleration();
    this.x += this.vx * this.speedMagnifier;
    this.y += this.vy * this.speedMagnifier / 1.5;
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

    // this.x = 500;
    // this.y = 102;

    this.paddleCollision(player1, player2);

    let pongBall = document.createElementNS(SVG_NS, 'circle');
    pongBall.setAttributeNS(null, 'cx', this.x);
    pongBall.setAttributeNS(null, 'cy', this.y);
    pongBall.setAttributeNS(null, 'r', this.radius);
    pongBall.setAttributeNS(null, 'fill', 'black');

    svg.appendChild(pongBall);

    this.goalDetection(player1, player2);
  }
}

