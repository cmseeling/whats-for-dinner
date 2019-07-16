import { MealPlan } from '@/models/MealPlan';
import { CreateEmptySchedule } from '@/state/interfaces/ScheduleState';

export function generateMealPlan(
    id: number|null = 1,
    name = 'test meal plan',
    created = new Date(),
    slots = CreateEmptySchedule()
  ): MealPlan {
  return {
    id,
    name,
    created,
    slots
  };
}
