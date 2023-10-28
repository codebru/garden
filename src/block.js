/* eslint-disable class-methods-use-this */
import { colors } from './constants';

const MIN_MOISTURE = 0;

class Block {
  constructor() {
    this.moisture = 0;
  }

  getColor() {
    return colors.BLANK;
  }

  isVisible() {
    return true;
  }

  changeMoisture(moistureToTransfer) {
    if (this.moisture + moistureToTransfer > MIN_MOISTURE) {
      this.moisture += moistureToTransfer;
      return true;
    }
    return false;
  }

  validateMoistureTransfer(moistureTransferFunction, x, y, z, moistureToTransfer) {
    if (moistureTransferFunction(x, y, z, moistureToTransfer)) this.moisture -= moistureToTransfer;
  }

  processMoisture() {
    // do nothing
  }

  render(renderFunction) {
    renderFunction(this.getColor());
  }

  process(
    moistureTransferFunction,
  ) {
    this.processMoisture(moistureTransferFunction);
  }
}

export { Block };
