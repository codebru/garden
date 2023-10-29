import { Air } from './air';
import { validateBasedOnProbability } from './utils';
import { PROBABILITY_DECOMPOSE, GROWTH_TO_NUTRIENCE_FACTOR } from './constants';

class Grid {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.grid = [];
    this.buildGrid();
  }

  checkValidGridPosition = (x, y, z) => {
    if (x < 0 || x >= this.x) return false;
    if (y < 0 || y >= this.y) return false;
    if (z < 0 || z >= this.z) return false;
    return true;
  };

  buildGrid = () => {
    for (let i = 0; i < this.x; i++) {
      const gridRow = [];

      for (let ii = 0; ii < this.y; ii++) {
        const gridCol = [];
        for (let iii = 0; iii < this.z; iii++) {
          gridCol.push(null);
        }
        gridRow.push(gridCol);
      }

      this.grid.push(gridRow);
    }
  };

  addBlock = (x, y, z, block) => {
    if (!this.checkValidGridPosition(x, y, z)) return false;
    if (this.grid[x][y][z] === null || this.grid[x][y][z].constructor.name === 'Air') {
      this.grid[x][y][z] = block;
      return true;
    }
    return false;
  };

  decomposeBlock = (x, y, z, growth) => { this.grid[x][y][z] = new Air(growth * GROWTH_TO_NUTRIENCE_FACTOR); };

  getBlock = (x, y, z) => {
    if (!this.checkValidGridPosition(x, y, z)) return null;
    if (this.grid[x][y][z] !== null) {
      return this.grid[x][y][z];
    }
    return null;
  };

  moistureTransferFunction = (x, y, z, moistureToTransfer) => {
    if (!this.checkValidGridPosition(x, y, z)) return false;
    if (this.grid[x][y][z] !== null) {
      return this.grid[x][y][z].changeMoisture(moistureToTransfer);
    }
    return false;
  };

  nutrientsTransferFunction = (x, y, z, nutrientsToTransfer) => {
    if (!this.checkValidGridPosition(x, y, z)) return false;
    if (this.grid[x][y][z] !== null) {
      return this.grid[x][y][z].changeNutrients(nutrientsToTransfer);
    }
    return false;
  };

  decomposeFunction = (x, y, z, growth) => {
    if (validateBasedOnProbability(PROBABILITY_DECOMPOSE)) this.decomposeBlock(x, y, z, growth);
  };

  processBlock = (
    x,
    y,
    z,
  ) => {
    if (!this.checkValidGridPosition(x, y, z)) throw new Error('Invalid grid position');
    if (this.grid[x][y][z] !== null) {
      this.grid[x][y][z].process(
        (
          deltaX,
          deltaY,
          deltaZ,
          moistureToTransfer,
        ) => this.moistureTransferFunction(
          x + deltaX,
          y + deltaY,
          z + deltaZ,
          moistureToTransfer,
        ),
        (
          deltaX,
          deltaY,
          deltaZ,
          nutrientsToTransfer,
        ) => this.nutrientsTransferFunction(
          x + deltaX,
          y + deltaY,
          z + deltaZ,
          nutrientsToTransfer,
        ),
        (
          growth,
        ) => this.decomposeFunction(
          x,
          y,
          z,
          growth,
        ),
      );
    }
  };

  addLayer = (z, block) => {
    for (let i = 0; i < this.x; i++) {
      for (let ii = 0; ii < this.y; ii++) {
        this.addBlock(i, ii, z, block());
      }
    }
  };

  renderBlock = (x, y, z, renderFunction) => {
    if (!this.checkValidGridPosition(x, y, z)) return false;
    if (this.grid[x][y][z] !== null) {
      this.grid[x][y][z].render((color) => renderFunction(x, y, color));
      return true;
    }
    return false;
  };

  renderGrid = (renderFunction) => {
    for (let i = 0; i < this.x; i++) {
      for (let ii = 0; ii < this.y; ii++) {
        for (let iii = this.z - 1; iii >= 0; iii--) {
          if (this.grid[i][ii][iii] !== null && this.grid[i][ii][iii].isVisible()) {
            this.renderBlock(i, ii, iii, renderFunction);
            break;
          }
        }
      }
    }
  };
}

export { Grid };
