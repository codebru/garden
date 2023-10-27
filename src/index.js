import { STEP } from './constants.js';
import { Dirt } from './dirt.js';

const canvas = document.getElementById('canvas');
const canvasContext = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvasContext.canvas.width = width;
canvasContext.canvas.height = height;

const displaySizeX = Math.ceil(height / STEP);
const displaySizeY = Math.ceil(width / STEP);

const dirtLevel = [];

for (let i = 0; i < displaySizeX; i++) {
  const dirtLevelRow = [];

  for (let ii = 0; ii < displaySizeY; ii++) {
    dirtLevelRow.push(new Dirt());
  }

  dirtLevel.push(dirtLevelRow);
}

const game = () => {
    dirtLevel.forEach((dirtLevelRow, y) => {
      dirtLevelRow.forEach((dirtLevelBlock, x) => {
        dirtLevelBlock.render(canvasContext, x, y);
      });
    });
  }

const gameLoop = () => {
  game();
  setTimeout(gameLoop, 100);
}

gameLoop();
