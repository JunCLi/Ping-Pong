import { KEYS, SVG_NS, PADDLE_VALUES } from '../settings';
import { Board } from './Board';
import { Paddle } from './Paddle';
import { Ball } from './Ball';
import { Score } from './Score';

export default class Game {
  constructor(element, width, height) {
    this.pause = false;

    this.element = element;
    this.width = width;
    this.height = height;

		// Other code goes here...
    this.gameElement = document.getElementById(this.element)
    this.board = new Board(this.width, this.height);

    this.paddleWidth = PADDLE_VALUES.paddleWidth;
    this.paddleHeight = PADDLE_VALUES.paddleHeight;
    this.boardGap = PADDLE_VALUES.boardGap;

    this.player1 = new Paddle(
      this.height,
      this.boardGap,
      (this.height - this.paddleHeight) / 2,
      KEYS.a,
      KEYS.z
    );

    this.player2 = new Paddle(
      this.height,
      this.width - this.boardGap - this.paddleWidth,
      (this.height - this.paddleHeight) / 2,
      KEYS.up,
      KEYS.down
    );

    this.ball = new Ball(
      8,
      this.width,
      this.height
    );

    this.score1 = new Score(this.width / 2 + 25, 30, 30);

    this.score2 = new Score(this.width / 2 - 50, 30, 30);
    
    document.addEventListener('keydown', event => {
      if (event.key === KEYS.spacebar) {
        this.pause = !this.pause;
      }
    });
  }
  
  render() {
    // More code goes here....
    
    // pause game
    if (this.pause) {
      this.player1.speed = 0;
      this.player2.speed = 0;
      return;
    }
    

    this.gameElement.innerHTML = '';
    let svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttributeNS(null, 'width', this.width);
    svg.setAttributeNS(null, 'height', this.height);
    svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
    this.gameElement.appendChild(svg);

    this.board.render(svg);
    this.ball.render(svg, this.player1, this.player2);
    this.player1.render(svg);
    this.player2.render(svg);

    this.score1.render(svg, this.player1.score);
    this.score2.render(svg, this.player2.score);
  }
}
