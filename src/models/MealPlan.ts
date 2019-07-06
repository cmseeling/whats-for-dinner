import { MealSlot } from './MealSlot';

export class MealPlan {
  public id: number|null;
  public created: Date;
  public slots: MealSlot[];

  constructor() {
    this.id = null;
    this.created = new Date();
    this.slots = [];
  }
}
