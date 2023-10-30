import {
  colors,
  MIN_MOISTURE,
  PROPOGATION_PROBABILITY,
  PROPOGATION_GROWTH_THRESHOLD,
  DRAW_PER_STEP_MOISTURE_PLANT,
  DRAW_PER_STEP_NUTRIENTS_PLANT,
  HEALTH_DROP_PER_STEP_PLANT,
  HEALTH_REGAIN_PER_STEP_PLANT,
  THRESHOLD_TO_LOSE_HEALTH_PLANT,
  HEALTH_DROP_MOISTURE_THRESHOLD_PLANT,
  HEALTH_DROP_NUTRIENTS_THRESHOLD_PLANT,
  GROWTH_MAX_PLANT,
  GROWTH_MOISTURE_THRESHOLD_PLANT,
  GROWTH_NUTRIENTS_THESHOLD_PLANT,
  GROWTH_PER_STEP_PLANT,
  HEALTH_COST_MOISTURE_PLANT,
  HEALTH_COST_NUTRIENTS_PLANT,
  SUSTAIN_COST_MOISTURE_PLANT,
  SUSTAIN_COST_NUTRIENTS_PLANT,
  GROWTH_COST_MOISTURE_PLANT,
  GROWTH_COST_NUTRIENTS_PLANT,
} from './constants';

import { randomIntiger, validateBasedOnProbability } from './utils';

import { Block } from './block';

class Plant extends Block {
  constructor() {
    super();
    this.growth = 0;
    this.health = 100;
    this.moistureExternal = 0;
    this.color = this.initColor();
  }

  isVisible = () => this.growth > 10;

  isAlive = () => this.health > 0;

  // eslint-disable-next-line class-methods-use-this
  initColor() {
    if (validateBasedOnProbability(0.1)) return colors.PLANT_1;
    if (validateBasedOnProbability(0.1)) return colors.PLANT_2;
    if (validateBasedOnProbability(0.1)) return colors.PLANT_3;
    if (validateBasedOnProbability(0.1)) return colors.PLANT_4;
    if (validateBasedOnProbability(0.1)) return colors.PLANT_5;
    return colors.PLANT_GREEN;
  }

  getColor() {
    if (this.health < 50) {
      return colors.PLANT_DYING;
    }
    return this.color;
  }

  runHealth() {
    if (
      this.growth > THRESHOLD_TO_LOSE_HEALTH_PLANT
      && (
        this.moisture < HEALTH_DROP_MOISTURE_THRESHOLD_PLANT
        || this.nutrients < HEALTH_DROP_NUTRIENTS_THRESHOLD_PLANT
      )
    ) {
      this.health -= HEALTH_DROP_PER_STEP_PLANT;
    } else if (this.health < 100) {
      this.health += HEALTH_REGAIN_PER_STEP_PLANT;
      this.moisture -= HEALTH_COST_MOISTURE_PLANT;
      this.nutrients -= HEALTH_COST_NUTRIENTS_PLANT;
    }

    if (this.health > 100) this.health = 100;
  }

  runSustain() {
    if (this.growth < 10) return;
    this.moisture -= SUSTAIN_COST_MOISTURE_PLANT;
    this.nutrients -= SUSTAIN_COST_NUTRIENTS_PLANT;
  }

  runGrowth() {
    if (this.growth >= GROWTH_MAX_PLANT) return;
    if (this.moisture < GROWTH_MOISTURE_THRESHOLD_PLANT) return;
    if (this.nutrients < GROWTH_NUTRIENTS_THESHOLD_PLANT) return;

    this.growth += GROWTH_PER_STEP_PLANT;
    this.moisture -= GROWTH_COST_MOISTURE_PLANT;
    this.nutrients -= GROWTH_COST_NUTRIENTS_PLANT;
  }

  // eslint-disable-next-line class-methods-use-this
  changeMoisture(moistureToTransfer) {
    if (this.moistureExternal + moistureToTransfer > MIN_MOISTURE) {
      this.moistureExternal += moistureToTransfer;
      return true;
    }
    return false;
  }

  processMoisture(moistureTransferFunction) {
    if (!this.isAlive()) return;
    if (this.moisture >= 100) return;
    const drawPerCell = DRAW_PER_STEP_MOISTURE_PLANT / 5;

    this.validateMoistureTransfer(
      moistureTransferFunction,
      0,
      0,
      -1,
      -drawPerCell,
    );
    this.validateMoistureTransfer(
      moistureTransferFunction,
      0,
      1,
      -1,
      -drawPerCell,
    );
    this.validateMoistureTransfer(
      moistureTransferFunction,
      1,
      0,
      -1,
      -drawPerCell,
    );
    this.validateMoistureTransfer(
      moistureTransferFunction,
      0,
      -1,
      -1,
      -drawPerCell,
    );
    this.validateMoistureTransfer(
      moistureTransferFunction,
      -1,
      0,
      -1,
      -drawPerCell,
    );

    moistureTransferFunction(
      0,
      0,
      -1,
      this.moistureExternal,
    );
  }

  processNutrients(nutrientsTransferFunction) {
    if (!this.isAlive()) return;
    if (this.nutrients >= 100) return;

    this.validateNutrientsTransfer(
      nutrientsTransferFunction,
      0,
      0,
      -1,
      -DRAW_PER_STEP_NUTRIENTS_PLANT,
    );
  }

  processPropogation(propogateFunction) {
    if (this.growth < PROPOGATION_GROWTH_THRESHOLD) return;
    if (validateBasedOnProbability(PROPOGATION_PROBABILITY)) {
      const randomX = randomIntiger(1, 2) ? 1 : -1;
      const randomY = randomIntiger(1, 2) ? 1 : -1;
      propogateFunction(
        randomX,
        randomY,
        0,
        new Plant(),
      );
    }
  }

  process(
    moistureTransferFunction,
    nutrientsTransferFunction,
    decomposeFunction,
    propogateFunction,
  ) {
    if (!this.isAlive()) {
      decomposeFunction(this.growth);
      return;
    }
    this.processMoisture(moistureTransferFunction);
    this.processNutrients(nutrientsTransferFunction);
    this.runHealth();
    this.runSustain();
    this.runGrowth();
    this.processPropogation(propogateFunction);
  }
}

export { Plant };
