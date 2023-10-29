import {
  colors,
} from './constants';
import { Block } from './block';

class Air extends Block {
  constructor(nutrients = 0) {
    super();
    this.nutrients = nutrients;
  }

  getColor() {
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

  processMoisture(moistureTransferFunction) {
    if (this.moisture > 0) {
      this.validateMoistureTransfer(moistureTransferFunction, 0, 0, -1, this.moisture);
    }
  }

  processNutrients(nutrientsTransferFunction) {
    if (this.nutrients > 0) {
      this.validateNutrientsTransfer(nutrientsTransferFunction, 0, 0, -1, this.nutrients);
    }
  }
}

export { Air };
