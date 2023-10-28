import {
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  DISPLAY_SIZE_X,
  DISPLAY_SIZE_Y,
  LAYER_COUNT,
  BLOCKS_PROCESSED_PER_STEP,
  RAIN_PER_STEP,
} from './constants';
import { Dirt } from './dirt';
import { Air } from './air';
import { drawBlock } from './draw';
import { Grid } from './grid';

const canvas = document.getElementById('canvas');
const canvasContext = canvas.getContext('2d');

canvasContext.canvas.width = WINDOW_WIDTH;
canvasContext.canvas.height = WINDOW_HEIGHT;

const grid = new Grid(DISPLAY_SIZE_X, DISPLAY_SIZE_Y, LAYER_COUNT);

grid.addLayer(2, () => new Air());
grid.addLayer(1, () => new Air());
grid.addLayer(0, () => new Dirt());

const game = () => {
  // Hacky rain implementation
  for (let i = 0; i < RAIN_PER_STEP; i++) {
    const randomX = Math.floor(Math.random() * DISPLAY_SIZE_X);
    const randomY = Math.floor(Math.random() * DISPLAY_SIZE_Y);

    grid.getBlock(randomX, randomY, 2).changeMoisture(50);
  }

  for (let i = 0; i < BLOCKS_PROCESSED_PER_STEP; i++) {
    const randomX = Math.floor(Math.random() * DISPLAY_SIZE_X);
    const randomY = Math.floor(Math.random() * DISPLAY_SIZE_Y);
    const randomZ = Math.floor(Math.random() * LAYER_COUNT);

    grid.processBlock(
      randomX,
      randomY,
      randomZ,
    );
  }
  grid.renderGrid((x, y, color) => drawBlock(canvasContext, x, y, color));
};

const gameLoop = () => {
  game();
  setTimeout(gameLoop, 100);
};

gameLoop();
