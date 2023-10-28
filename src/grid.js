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
    if (this.grid[x][y][z] === null) {
      this.grid[x][y][z] = block;
      return true;
    }
    return false;
  };

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

  processBlock = (
    x,
    y,
    z,
    renderFunction,
  ) => {
    if (!this.checkValidGridPosition(x, y, z)) throw new Error('Invalid grid position');
    if (this.grid[x][y][z] !== null) {
      this.grid[x][y][z].process(
        renderFunction,
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
}

export { Grid };
