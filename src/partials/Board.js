import { SVG_NS } from '../settings';
export class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  render(svg) {
    let rect = document.createElementNS(SVG_NS, 'rect');
    rect.setAttributeNS(null, 'width', this.width);
    rect.setAttributeNS(null, 'height', this.height);
    rect.setAttributeNS(null, 'fill', '#eee');

    let midLine = document.createElementNS(SVG_NS, 'line');
    midLine.setAttributeNS(null, 'x1', this.width / 2);
    midLine.setAttributeNS(null, 'y1', 0);
    midLine.setAttributeNS(null, 'x2', this.width / 2);
    midLine.setAttributeNS(null, 'y2', this.height);
    midLine.setAttributeNS(null, 'stroke', 'black');
    midLine.setAttributeNS(null, 'stroke-dasharray', '20, 15');
    midLine.setAttributeNS(null, 'stroke-width', '4');
    midLine.setAttributeNS(null, 'fill', 'white');

    svg.appendChild(rect);
    svg.appendChild(midLine);
  }
}