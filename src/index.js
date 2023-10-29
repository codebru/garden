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
import { Grass } from './grass';

const canvas = document.getElementById('canvas');
const canvasContext = canvas.getContext('2d');

canvasContext.canvas.width = WINDOW_WIDTH;
canvasContext.canvas.height = WINDOW_HEIGHT;

const grid = new Grid(DISPLAY_SIZE_X, DISPLAY_SIZE_Y, LAYER_COUNT);

grid.addLayer(2, () => new Air());
grid.addLayer(1, () => new Grass());
grid.addLayer(0, () => new Dirt());
/*
grid.addBlock(4, 4, 1, new Grass());
grid.addBlock(4, 5, 1, new Grass());
grid.addBlock(4, 6, 1, new Grass());
grid.addBlock(4, 7, 1, new Grass());
grid.addBlock(4, 8, 1, new Grass());
grid.addBlock(4, 9, 1, new Grass());
grid.addBlock(4, 10, 1, new Grass());
grid.addBlock(4, 11, 1, new Grass());
*/
const validateBasedOnProbability = (probability) => {
  const random = Math.random();
  if (random < probability) {
    return true;
  }
  return false;
};

const rain = () => {
  // Hacky rain implementation
  // TODO: Put on a cycle so it rains for random amount of time at random points
  for (let i = 0; i < RAIN_PER_STEP; i++) {
    const randomX = Math.floor(Math.random() * DISPLAY_SIZE_X);
    const randomY = Math.floor(Math.random() * DISPLAY_SIZE_Y);

    grid.getBlock(randomX, randomY, 2).changeMoisture(1000);
  }

  if (validateBasedOnProbability(0.95)) setTimeout(rain, 100);
};

const game = () => {
  if (validateBasedOnProbability(0.01)) rain();

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
  setTimeout(gameLoop, 1);
};

gameLoop();
