import { MealSlot } from '@/models/MealSlot';

export interface ScheduleState {
  mealSlots: MealSlot[];
}

export const dayList: string[] = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

export const mealList: string[] = [
  'Breakfast', 'Lunch', 'Dinner'
];

export const CreateEmptySchedule = (): MealSlot[] => {
  const mealSlots: MealSlot[] = [];
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
      dayIndex,
      mealIndex,
      recipeIds: []
    });
  }

  return mealSlots;
};

export const DefaultScheduleState = (): ScheduleState => {
  const mealSlots: MealSlot[] = CreateEmptySchedule();

  return {
    mealSlots
  };
};
