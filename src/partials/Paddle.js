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

    document.addEventListener('keydown', event => {
      switch (event.key) {
        case up:
          this.y -= this.speed;
          this.y = Math.max(this.y, 0);
          break;
        case down:
          this.y += this.speed;
          this.y = Math.min(this.y, this.boardHeight - this.height);
          break;
      }
    });
  }

  render(svg) {
    let paddle = document.createElementNS(SVG_NS, 'rect');
    paddle.setAttributeNS(null, 'width', this.width);
    paddle.setAttributeNS(null, 'height', this.height);
    paddle.setAttributeNS(null, 'x', this.x);
    paddle.setAttributeNS(null, 'y', this.y);
    paddle.setAttributeNS(null, 'fill', 'black');

    svg.appendChild(paddle);
  }
}