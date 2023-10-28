import {
  colors,
} from './constants';

const MIN_MOISTURE = 0;

class Air {
  constructor() {
    this.moisture = 0;
  }

  getAirColor() {
    if (this.moisture > 0) {
      return colors.AIR_WET;
    }
    return colors.AIR_DRY;
  }

  isVisible() {
    if (this.moisture > 0) {
      return true;
    }
    return false;
  }

  validateMoistureTransfer(moistureTransferFunction, x, y, z, moistureToTransfer) {
    if (moistureTransferFunction(x, y, z, moistureToTransfer)) this.moisture -= moistureToTransfer;
  }

  processMoisture(moistureTransferFunction) {
    if (this.moisture > 0) {
      this.validateMoistureTransfer(moistureTransferFunction, 0, 0, -1, this.moisture);
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
    renderFunction(this.getAirColor());
  }

  process(
    moistureTransferFunction,
  ) {
    this.processMoisture(moistureTransferFunction);
  }
}

export { Air };
