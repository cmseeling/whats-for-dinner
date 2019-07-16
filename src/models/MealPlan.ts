import { MealSlot } from './MealSlot';

export class MealPlan {
  public id: number|null;
  public name: string;
  public created: Date;
  public slots: MealSlot[];

  constructor() {
    this.id = null;
    this.name = '';
    this.created = new Date();
    this.slots = [];
  }
}
