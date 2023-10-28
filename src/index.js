import {
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  DISPLAY_SIZE_X,
  DISPLAY_SIZE_Y,
  LAYER_COUNT,
} from './constants';
import { Dirt } from './dirt';
import { drawBlock } from './draw';
import { Grid } from './grid';

const canvas = document.getElementById('canvas');
const canvasContext = canvas.getContext('2d');

canvasContext.canvas.width = WINDOW_WIDTH;
canvasContext.canvas.height = WINDOW_HEIGHT;

const grid = new Grid(DISPLAY_SIZE_X, DISPLAY_SIZE_Y, LAYER_COUNT);

grid.addLayer(0, () => new Dirt());

grid.getBlock(3, 3, 0).changeMoisture(1000);
grid.getBlock(6, 9, 0).changeMoisture(1000);

const game = () => {
  const randomX = Math.floor(Math.random() * DISPLAY_SIZE_X);
  const randomY = Math.floor(Math.random() * DISPLAY_SIZE_Y);
  const randomZ = Math.floor(Math.random() * LAYER_COUNT);

  grid.processBlock(
    randomX,
    randomY,
    randomZ,
    (color) => drawBlock(canvasContext, randomX, randomY, color),
  );
};

const gameLoop = () => {
  game();
  setTimeout(gameLoop, 0);
};

gameLoop();
