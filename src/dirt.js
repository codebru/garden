import {
  EVAPORATION_FROM_DIRT,
  colors,
} from './constants';
import { Block } from './block';

const SATURATED = 66;

class Dirt extends Block {
  constructor() {
    super();
    this.nutrients = 1000;
  }

  getColor = () => {
    if (this.moisture > 66) {
      return colors.DIRT_WET;
    } if (this.moisture > 33) {
      return colors.DIRT_NORMAL;
    }
    return colors.DIRT_DRY;
  };

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

  evaporate() {
    if (this.moisture > EVAPORATION_FROM_DIRT) {
      this.moisture -= EVAPORATION_FROM_DIRT;
    }
  }

  process(
    moistureTransferFunction,
    nutrientsTransferFunction,
  ) {
    this.processMoisture(moistureTransferFunction);
    this.processNutrients(nutrientsTransferFunction);
    this.evaporate();
  }
}

export { Dirt };
