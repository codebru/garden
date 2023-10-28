import {
  colors,
} from './constants';
import { Block } from './block';

class Air extends Block {
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
}

export { Air };
