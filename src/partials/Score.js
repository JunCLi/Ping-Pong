import { SVG_NS } from '../settings'

export class Score {
  constructor(x, y, size) {
    this._x = x;
    this._y = y;
    this._size = size;
  }

  get x() { return this._x; }
  get y() { return this._y; }
  get size() { return this._size; }

  render(svg, score) {
    let text = document.createElementNS(SVG_NS, 'text');
    text.setAttributeNS(null, 'x', this.x);
    text.setAttributeNS(null, 'y', this.y);
    text.setAttributeNS(null, 'font-family', '"Silkscreen Web", monotype');
    text.setAttributeNS(null, 'font-size', this.size);
    text.setAttributeNS(null, 'fill', 'white');
    
    text.textContent = score;
    svg.appendChild(text);
  }
}