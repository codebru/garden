import { drawBlock } from './draw';

const BROWN_1 = '#8B4513';
const BROWN_2 = '#A0522D';
const BROWN_3 = '#CD853F';

const pickDirtColor = () => {
  switch (Math.floor(Math.random() * 3) + 1) {
    case 1:
      return BROWN_1;
    case 2:
      return BROWN_2;
    case 3:
      return BROWN_3;
    default:
      return BROWN_1;
  }
};

class Dirt {
  // eslint-disable-next-line class-methods-use-this
  render(canvasContext, x, y) {
    drawBlock(canvasContext, x, y, pickDirtColor());
  }
}

export { Dirt };
