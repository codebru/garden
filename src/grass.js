import {
  colors,
  DRAW_PER_STEP_MOISTURE_GRASS,
  DRAW_PER_STEP_NUTRIENTS_GRASS,
  HEALTH_DROP_PER_STEP_GRASS,
  HEALTH_REGAIN_PER_STEP_GRASS,
  THRESHOLD_TO_LOSE_HEALTH_GRASS,
  HEALTH_DROP_MOISTURE_THRESHOLD_GRASS,
  HEALTH_DROP_NUTRIENTS_THRESHOLD_GRASS,
  GROWTH_MAX_GRASS,
  GROWTH_MOISTURE_THRESHOLD_GRASS,
  GROWTH_NUTRIENTS_THESHOLD_GRASS,
  GROWTH_PER_STEP_GRASS,
  HEALTH_COST_MOISTURE_GRASS,
  HEALTH_COST_NUTRIENTS_GRASS,
  SUSTAIN_COST_MOISTURE_GRASS,
  SUSTAIN_COST_NUTRIENTS_GRASS,
  GROWTH_COST_MOISTURE_GRASS,
  GROWTH_COST_NUTRIENTS_GRASS,
} from './constants';

import { Block } from './block';

class Grass extends Block {
  constructor() {
    super();
    this.growth = 0;
    this.health = 100;
  }

  isVisible = () => this.growth > 10;

  isAlive = () => this.health > 0;

  getColor() {
    if (this.health < 50) {
      return colors.GRASS_DYING;
    }
    return colors.GRASS;
  }

  runHealth() {
    if (
      this.growth > THRESHOLD_TO_LOSE_HEALTH_GRASS
      && (
        this.moisture < HEALTH_DROP_MOISTURE_THRESHOLD_GRASS
        || this.nutrients < HEALTH_DROP_NUTRIENTS_THRESHOLD_GRASS
      )
    ) {
      this.health -= HEALTH_DROP_PER_STEP_GRASS;
    } else if (this.health < 100) {
      this.health += HEALTH_REGAIN_PER_STEP_GRASS;
      this.moisture -= HEALTH_COST_MOISTURE_GRASS;
      this.nutrients -= HEALTH_COST_NUTRIENTS_GRASS;
    }

    if (this.health > 100) this.health = 100;
  }

  runSustain() {
    if (this.growth < 10) return;
    this.moisture -= SUSTAIN_COST_MOISTURE_GRASS;
    this.nutrients -= SUSTAIN_COST_NUTRIENTS_GRASS;
  }

  runGrowth() {
    if (this.growth >= GROWTH_MAX_GRASS) return;
    if (this.moisture < GROWTH_MOISTURE_THRESHOLD_GRASS) return;
    if (this.nutrients < GROWTH_NUTRIENTS_THESHOLD_GRASS) return;

    this.growth += GROWTH_PER_STEP_GRASS;
    this.moisture -= GROWTH_COST_MOISTURE_GRASS;
    this.nutrients -= GROWTH_COST_NUTRIENTS_GRASS;
  }

  processMoisture(moistureTransferFunction) {
    if (!this.isAlive()) return;
    if (this.moisture >= 100) return;

    this.validateMoistureTransfer(
      moistureTransferFunction,
      0,
      0,
      -1,
      -DRAW_PER_STEP_MOISTURE_GRASS,
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
      -DRAW_PER_STEP_NUTRIENTS_GRASS,
    );
  }

  process(
    moistureTransferFunction,
    nutrientsTransferFunction,
  ) {
    if (!this.isAlive()) return;
    this.processMoisture(moistureTransferFunction);
    this.processNutrients(nutrientsTransferFunction);
    this.runHealth();
    this.runSustain();
    this.runGrowth();
  }
}

export { Grass };
