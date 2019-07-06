import { MealSlot } from './MealSlot';

export class AugmentedSlot extends MealSlot {
  public selected: boolean;

  constructor() {
    super();
    this.selected = false;
  }
}
