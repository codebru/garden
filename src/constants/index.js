import {
  BROWN_1,
  BROWN_2,
  BROWN_3,
  DIRT_WET,
  DIRT_NORMAL,
  DIRT_DRY,
} from './colors';

const STEP = 10;

const SHRINK_FACTOR = 0.2;

const WINDOW_WIDTH = window.innerWidth;
const WINDOW_HEIGHT = window.innerHeight;

const DISPLAY_SIZE_X = Math.ceil((WINDOW_WIDTH / STEP) * SHRINK_FACTOR);
const DISPLAY_SIZE_Y = Math.ceil((WINDOW_HEIGHT / STEP) * SHRINK_FACTOR);

const LAYER_COUNT = 3;

const BLOCKS_PROCESSED_PER_STEP = 50;

const colors = {
  BROWN_1,
  BROWN_2,
  BROWN_3,
  DIRT_WET,
  DIRT_NORMAL,
  DIRT_DRY,
};

export {
  STEP,
  SHRINK_FACTOR,
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  DISPLAY_SIZE_X,
  DISPLAY_SIZE_Y,
  LAYER_COUNT,
  BLOCKS_PROCESSED_PER_STEP,
  colors,
};
