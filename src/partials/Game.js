import { KEYS, SVG_NS, PADDLE_VALUES } from '../settings';
import { Board } from './Board';
import { Paddle } from './Paddle';
import { Ball } from './Ball';
import { Score } from './Score';

export default class Game {
  constructor(element, width, height) {
    // Start the game on pause
    this.pause = true;

    this.element = element;
    this.width = width;
    this.height = height;
    
    // instantiate board and game elements
    this.gameElement = document.getElementById(this.element)
    this.board = new Board(this.width, this.height);

    // Set and instantiate paddle property elements
    this.paddleWidth = PADDLE_VALUES.paddleWidth;
    this.paddleHeight = PADDLE_VALUES.paddleHeight;

    this.player1 = new Paddle(
      this.height,
      PADDLE_VALUES.boardGap,
      (this.height - this.paddleHeight) / 2,
      KEYS.a,
      KEYS.z
    );

    this.player2 = new Paddle(
      this.height,
      this.width - PADDLE_VALUES.boardGap - this.paddleWidth,
      (this.height - this.paddleHeight) / 2,
      KEYS.up,
      KEYS.down
    );

    // Set and instantiate the ball
    this.ball = new Ball(
      8,
      this.width,
      this.height
    );

    // Set and instantiate individual scores
    this.score1 = new Score(
      this.width / 2 + this.width / 20,
      this.height / 8,
      this.height / 8);

    this.score2 = new Score(
      this.width / 2 - this.width / 10,
      this.height / 8,
      this.height / 8);
    
    // Event listener to pause and unpause game
    document.addEventListener('keydown', event => {
      if (event.key === KEYS.spacebar) {
        this.pause = !this.pause;
      }
    });
  }

  render() {
    
    // pause game
    if (this.pause) {
      this.player1.speed = 0;
      this.player2.speed = 0;
      return;
    } else {
      this.player1.speed = PADDLE_VALUES.paddleSpeed;
      this.player2.speed = PADDLE_VALUES.paddleSpeed;
    }

    // Render game elements
    
    // Render game canvas
    this.gameElement.innerHTML = '';
    let svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttributeNS(null, 'width', this.width);
    svg.setAttributeNS(null, 'height', this.height);
    svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
    this.gameElement.appendChild(svg);

    // Render individual game elements
    this.board.render(svg);

    // Pass paddle properties so ball can interact with paddles
    this.ball.render(svg, this.player1, this.player2);
    this.player1.render(svg);
    this.player2.render(svg);


    // Render score
    this.score1.render(svg, this.player1.score);
    this.score2.render(svg, this.player2.score);
  }
}
