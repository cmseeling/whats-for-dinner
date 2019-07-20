import { MealPlan } from '@/models/MealPlan';
import { IDictionary, Dictionary } from '@/utils/Dictionary';

export interface MealPlansState {
  selectedPlanId: number;
  mealPlans: IDictionary<MealPlan>;
}

export const DefaultMealPlansState = (): MealPlansState => {
  const mealPlans = new Dictionary<MealPlan>();

  return {
    selectedPlanId: -1,
    mealPlans
  };
};
