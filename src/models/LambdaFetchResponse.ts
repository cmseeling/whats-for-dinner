import { Recipe } from './Recipe';
import { MealPlan } from './MealPlan';

export interface LambdaFetchResponse {
  recipes: Recipe[];
  mealPlans: MealPlan[];
}
