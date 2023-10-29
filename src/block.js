/* eslint-disable class-methods-use-this */
import {
  MIN_MOISTURE,
  MIN_NUTRIENTS,
  colors,
} from './constants';

class Block {
  constructor() {
    this.moisture = 0;
    this.nutrients = 0;
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

  changeNutrients(nutrientsToTransfer) {
    if (this.nutrients + nutrientsToTransfer > MIN_NUTRIENTS) {
      this.nutrients += nutrientsToTransfer;
      return true;
    }
    return false;
  }

  validateMoistureTransfer(moistureTransferFunction, x, y, z, moistureToTransfer) {
    if (moistureTransferFunction(x, y, z, moistureToTransfer)) this.moisture -= moistureToTransfer;
  }

  validateNutrientsTransfer(nutrientsTransferFunction, x, y, z, nutrientsToTransfer) {
    if (
      nutrientsTransferFunction(
        x,
        y,
        z,
        nutrientsToTransfer,
      )) this.nutrients -= nutrientsToTransfer;
  }

  processMoisture() {
    // do nothing
  }

  processNutrients() {
    // do nothing
  }

  render(renderFunction) {
    renderFunction(this.getColor());
  }

  process(
    moistureTransferFunction,
    nutrientsTransferFunction,
  ) {
    this.processMoisture(moistureTransferFunction);
    this.processNutrients(nutrientsTransferFunction);
  }
}

export { Block };
