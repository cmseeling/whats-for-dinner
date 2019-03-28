import { RecipesState } from './recipes/state';
import { ScheduleState } from './schedule/state';

export interface AppState {
    RecipesSlice: RecipesState;
    ScheduleSlice: ScheduleState;
}