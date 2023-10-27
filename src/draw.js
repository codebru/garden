import { STEP } from './constants';

const drawBlock = (ctx, x, y, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x * STEP, y * STEP, STEP, STEP);
};

export { drawBlock };
