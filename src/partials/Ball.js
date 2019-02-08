import { SVG_NS } from '../settings';

export class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
  }

  render(svg) {
    let pongBall = document.createElementNS(SVG_NS, 'circle');
    pongBall.setAttributeNS(null, 'cx', this.boardWidth / 2);
    pongBall.setAttributeNS(null, 'cy', this.boardHeight / 2);
    pongBall.setAttributeNS(null, 'r', this.radius);
    pongBall.setAttributeNS(null, 'fill', 'black');

    svg.appendChild(pongBall);
  }
}