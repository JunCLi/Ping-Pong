import { SVG_NS, PADDLE_VALUES } from '../settings';

export class Paddle {
  constructor(boardHeight, x, y, up, down) {
    this.boardHeight = boardHeight;
    this.width = PADDLE_VALUES.paddleWidth;
    this.height = PADDLE_VALUES.paddleHeight;
    this.x = x;
    this.y = y;
    this.up = up;
    this.down = down;
    this.speed = PADDLE_VALUES.paddleSpeed;
    this.score = 0;

    this.move = false;
    this.direction = [];

    document.addEventListener('keydown', event => {
      this.move = true;
      switch (event.key) {
        case this.up:
          this.direction[event.key] = true;
          break;
        case this.down:
          this.direction[event.key] = true;
          break;
      }
    });

    document.addEventListener('keyup', event => {
      this.move = false;
      this.direction[event.key] = false;
    });
  }

  movePaddles() {
    if (this.move === true) {
      console.log(this.direction);
      if (this.direction[this.up]) {
        this.moveUp();
      } else if (this.direction[this.down]) {
        this.moveDown();
      }
    }
  }

  moveUp() {
    this.y -= this.speed;
    this.y = Math.max(this.y, 0);
  }

  moveDown() {
    this.y += this.speed;
    this.y = Math.min(this.y, this.boardHeight - this.height);
  }

  render(svg) {
    this.movePaddles();

    let paddle = document.createElementNS(SVG_NS, 'rect');
    paddle.setAttributeNS(null, 'width', this.width);
    paddle.setAttributeNS(null, 'height', this.height);
    paddle.setAttributeNS(null, 'x', this.x);
    paddle.setAttributeNS(null, 'y', this.y);
    paddle.setAttributeNS(null, 'fill', 'black');

    svg.appendChild(paddle);
  }
}