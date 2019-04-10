export interface IMealSlot {
  id: number;
  selected: boolean;
  dayIndex: number;
  mealIndex: number;
  recipeIds: number[];
}

export interface ScheduleState {
  mealSlots: IMealSlot[];
}

export const dayList: string[] = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

export const mealList: string[] = [
  'Breakfast', 'Lunch', 'Dinner'
];

export const DefaultScheduleState = (): ScheduleState => {
  const mealSlots: IMealSlot[] = [];
  let i;
  for (i = 0; i < 21; i++) {
    const dayIndex = (i % 7);
    let mealIndex;
    if (i < 7) {
      mealIndex = 0;
    } else if (i < 14) {
      mealIndex = 1;
    } else {
      mealIndex = 2;
    }

    mealSlots.push({
      id: i,
      selected: false,
      dayIndex,
      mealIndex,
      recipeIds: []
    });
  }

  return {
    mealSlots
  };
};
