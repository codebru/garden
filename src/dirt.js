import {
  colors,
} from './constants';

const SATURATED = 66;
const MOISTURE_TRANSFER_RATE = 33;
const MIN_MOISTURE = 0;

class Dirt {
  constructor() {
    this.moisture = 0;
  }

  // eslint-disable-next-line class-methods-use-this
  isVisible() {
    return true;
  }

  dirtColor = () => {
    if (this.moisture > 66) {
      return colors.DIRT_WET;
    } if (this.moisture > 33) {
      return colors.DIRT_NORMAL;
    }
    return colors.DIRT_DRY;
  };

  validateMoistureTransfer(moistureTransferFunction, x, y, z, moistureToTransfer) {
    if (moistureTransferFunction(x, y, z, moistureToTransfer)) this.moisture -= moistureToTransfer;
  }

  processMoisture(moistureTransferFunction) {
    if (this.moisture > SATURATED) {
      let moistureToTransfer = (this.moisture - SATURATED) / 5;
      if (moistureToTransfer < 1) moistureToTransfer = 1;

      this.validateMoistureTransfer(moistureTransferFunction, -1, 0, 0, moistureToTransfer);
      this.validateMoistureTransfer(moistureTransferFunction, 1, 0, 0, moistureToTransfer);
      this.validateMoistureTransfer(moistureTransferFunction, 0, 1, 0, moistureToTransfer);
      this.validateMoistureTransfer(moistureTransferFunction, 0, -1, 0, moistureToTransfer);
    }
  }

  changeMoisture(moistureToTransfer) {
    if (this.moisture + moistureToTransfer > MIN_MOISTURE) {
      this.moisture += moistureToTransfer;
      return true;
    }
    return false;
  }

  render(renderFunction) {
    renderFunction(this.dirtColor());
  }

  process(
    moistureTransferFunction,
  ) {
    this.processMoisture(moistureTransferFunction);
  }
}

export { Dirt };
