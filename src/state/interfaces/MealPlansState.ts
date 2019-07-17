import { MealPlan } from '@/models/MealPlan';
import { IDictionary, Dictionary } from '@/utils/Dictionary';
import { CreateEmptySchedule } from './ScheduleState';

export interface MealPlansState {
  mealPlans: IDictionary<MealPlan>;
}

export const DefaultMealPlansState = (): MealPlansState => {
  const mealPlans = new Dictionary<MealPlan>();

  return {
    mealPlans
  };
};
