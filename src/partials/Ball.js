import { SVG_NS, PADDLE_VALUES } from '../settings';

export class Ball {

  // Instantiate ball properties
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
    this.baseSpeedMagnifier = 1 / 2;

    this.speedMagnifier = this.baseSpeedMagnifier * 1.5;
    this.paddleHitMuliplier = 2.5;

    // Reset ball on creation
    this.resetBall();
    
  }

  // Initial direction vector
  instantiateDirection() {
    this.vy = Math.floor(Math.random() * 6 - 3);
    if (this.vy === 0) {
      this.instantiateDirection();
    }
    this.vx = this.direction * 4;
  }

  // Reset ball function
  resetBall() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;
    this.speedMagnifier = this.baseSpeedMagnifier;
    this.instantiateDirection();
  }

  // Robust wall collision detection function to accomodate for acceleration
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
  
  // Detect Paddle collision
  paddleCollision(player1, player2) {

    const halfPaddleWidth = PADDLE_VALUES.paddleWidth / 2;
    const halfPaddleHeight = PADDLE_VALUES.paddleHeight / 2;

    // Determine relevant paddle
    let relPaddle = player2

    if (this.vx < 0) {
      relPaddle = player1;
    } 

    // Distance X and Y from center of ball and center of paddle
    const distX = Math.abs(this.x - (relPaddle.x + halfPaddleWidth));
    const distY = Math.abs(this.y - (relPaddle.y + halfPaddleHeight));

    // Detect collision based on distance between centers for sides
    if (distX <= (halfPaddleWidth + this.radius) && distY <= (halfPaddleHeight + this.radius)) {

      // Pythagorean theorem to determine corner of paddle
      const cornerDist = Math.pow(Math.abs(distX - halfPaddleWidth), 2) + Math.pow(Math.abs(distY - halfPaddleHeight), 2);

      // Check for collision at corners of paddle
      if (distY <= halfPaddleHeight || cornerDist >= Math.pow(this.radius, 2)) {
        this.paddleCollisionPhysics(relPaddle, halfPaddleWidth, halfPaddleHeight);
      }
    }
  }

  // Additional physics algorithms to make paddle collision more dyanmic
  paddleCollisionPhysics(relPaddle, halfPaddleWidth, halfPaddleHeight) {

    // Increase speed of ball on paddle collision
    if (this.speedMagnifier > 3 * this.baseSpeedMagnifier) {
      this.speedMagnifier = 3 * this.baseSpeedMagnifier
    } else {
      this.speedMagnifier *= this.paddleHitMuliplier;
    }

    // Save point of impact
    const padY = (this.y - (relPaddle.y + halfPaddleHeight))

    // If it hits the paddle at the back half, change Y vector but not X
    if (this.x < PADDLE_VALUES.boardGap + halfPaddleWidth || this.x > this.boardWidth - PADDLE_VALUES.boardGap - halfPaddleWidth) {
      this.vy *= -1.25;
      this.vx *= 0.75;
      return;
    } else {
      
      // Reverse X otherwise
      this.vx *= -1;

      // Modify Y vector based on where it hits the paddle
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

  // Decelerate the ball as it travels across the board
  ballAcceleration() {
    const speedDiff = this.speedMagnifier - this.baseSpeedMagnifier;
    if (speedDiff * 100 > 1) {
      this.speedMagnifier -= speedDiff / 75;
    } else {
      this.speedMagnifier = this.baseSpeedMagnifier;
    }
  }

  // Calculate new position of ball based on vectors and acceleration
  ballMovement() {
    this.ballAcceleration();
    this.x += this.vx * this.speedMagnifier;
    this.y += this.vy * this.speedMagnifier / 1.5;
  }

  // Add score on goal and reset ball
  goal(player) {
    player.score++;
    this.resetBall();
  }

  // Detect which player scored
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

    // Calculate collisions and new ball position before render
    this.ballMovement();
    this.wallCollision();

    this.paddleCollision(player1, player2);

    // Render ball
    let pongBall = document.createElementNS(SVG_NS, 'circle');
    pongBall.setAttributeNS(null, 'cx', this.x);
    pongBall.setAttributeNS(null, 'cy', this.y);
    pongBall.setAttributeNS(null, 'r', this.radius);
    pongBall.setAttributeNS(null, 'fill', 'black');

    svg.appendChild(pongBall);

    // Check for goal
    this.goalDetection(player1, player2);
  }
}

