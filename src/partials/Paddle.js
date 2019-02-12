import { SVG_NS, PADDLE_VALUES } from '../settings';

export class Paddle {
  constructor(boardHeight, x, y, up, down) {

    // Initial and fixed paddle values
    this.boardHeight = boardHeight;
    this.width = PADDLE_VALUES.paddleWidth;
    this.height = PADDLE_VALUES.paddleHeight;
    this.x = x;
    this.y = y;
    this.up = up;
    this.down = down;
    this.speed = PADDLE_VALUES.paddleSpeed;
    this.score = 0;

    // Direction array to store paddle direction
    this.direction = [];

    // Event Listner to detect keypresses
    document.addEventListener('keydown', event => {
      switch (event.key) {
        case this.up:
          this.direction[event.key] = true;
          break;
        case this.down:
          this.direction[event.key] = true;
          break;
      }
    });

    // Detect when key is no longer pressed
    document.addEventListener('keyup', event => {
      this.direction[event.key] = false;
    });
  }

  // Move paddles depending on which key is pressed
  movePaddles() {
    if (this.direction[this.up]) {
      this.moveUp();
    } else if (this.direction[this.down]) {
      this.moveDown();
    }
  }

  // Actual movement functions
  moveUp() {
    this.y -= this.speed;
    this.y = Math.max(this.y, 0);
  }

  moveDown() {
    this.y += this.speed;
    this.y = Math.min(this.y, this.boardHeight - this.height);
  }

  render(svg) {

    // Move paddle before render
    this.movePaddles();

    // Render paddles
    let paddle = document.createElementNS(SVG_NS, 'rect');
    paddle.setAttributeNS(null, 'width', this.width);
    paddle.setAttributeNS(null, 'height', this.height);
    paddle.setAttributeNS(null, 'x', this.x);
    paddle.setAttributeNS(null, 'y', this.y);
    paddle.setAttributeNS(null, 'fill', 'black');

    svg.appendChild(paddle);
  }
}