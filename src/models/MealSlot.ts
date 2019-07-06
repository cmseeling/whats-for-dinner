export class MealSlot {
  public id: number;
  public dayIndex: number;
  public mealIndex: number;
  public recipeIds: number[];

  constructor() {
    this.id = -1;
    this.dayIndex = -1;
    this.mealIndex = -1;
    this.recipeIds = [];
  }
}
