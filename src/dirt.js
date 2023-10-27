import { drawBlock } from './draw.js';

class Dirt {
  render(canvasContext, x, y) {
    drawBlock(canvasContext, x, y, 'brown');
  }
}

export { Dirt };
