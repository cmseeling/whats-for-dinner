import mealPlans from '@/state/modules/mealPlans';
import LambdaAPI from '@/api/LambdaAPI';
import { MealPlansState, DefaultMealPlansState } from '@/state/interfaces/MealPlansState';
import { generateMealPlan } from '../../helpers/mealPlan';
import { MealPlan } from '@/models/MealPlan';
import { Dictionary } from '@/utils/Dictionary';

let state: MealPlansState;
let testPlan1: MealPlan;
let testPlan2: MealPlan;
let commit: jest.Mock;
let rootGetters: any;
let mockUser: any;

describe('mealPlans.ts', () => {
  beforeEach(() => {
    testPlan1 = generateMealPlan(1, 'test plan 1');
    testPlan2 = generateMealPlan(2, 'test plan 2');

    state = DefaultMealPlansState();
    state.mealPlans.Upsert('1', testPlan1);
    state.mealPlans.Upsert('2', testPlan2);

    commit = jest.fn();

    mockUser = {
      email: 'test@test.com'
    };

    rootGetters = {
      ['identity/user']: mockUser
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('gets a list of MealPlans', () => {
    expect(mealPlans.getters.mealPlans(state)).toEqual([testPlan1, testPlan2]);
  });

  it('gets a meal plan by its id', () => {
    expect(mealPlans.getters.getMealPlanById(state)('1')).toBe(testPlan1);
  });

  it('gets a meal plan by its index', () => {
    expect(mealPlans.getters.getMealPlanByIndex(state)(1)).toBe(testPlan2);
  });

  it('updates a meal plan', () => {
    const updatedPlan = {
      ...testPlan1,
      name: 'updated name of plan 1'
    };

    const expectedState = {...state};
    expectedState.mealPlans.Upsert('1', updatedPlan);

    mealPlans.mutations.updateMealPlan(state, updatedPlan);

    expect(state).toEqual(expectedState);
  });

  it('adds meal plans from a list', () => {
    const newPlan1 = generateMealPlan(3, 'new plan 1');
    const newPlan2 = generateMealPlan(4, 'new plan 2');

    const expectedState = {...state};
    expectedState.mealPlans.Upsert('3', newPlan1);
    expectedState.mealPlans.Upsert('4', newPlan2);

    mealPlans.mutations.addMealPlans(state, [newPlan1, newPlan2]);

    expect(state).toEqual(expectedState);
  });

  it('removes a meal plan by id', () => {
    const expectedState = {...state};
    expectedState.mealPlans.Remove('2');

    mealPlans.mutations.removeMealPlan(state, 2);

    expect(state).toEqual(expectedState);
  });

  it('resets the meal plan list', () => {
    const expectedState = {...state};
    expectedState.mealPlans = new Dictionary<MealPlan>();

    mealPlans.mutations.resetMealPlans(state);

    expect(state).toEqual(expectedState);
  });

  it('sets meal plans', async () => {
    const planArray = [testPlan1, testPlan2];

    await mealPlans.actions.setMealPlans({commit}, planArray);

    expect(commit).toBeCalledTimes(2);
    expect(commit).toHaveBeenNthCalledWith(1, 'resetMealPlans');
    expect(commit).toHaveBeenNthCalledWith(2, 'addMealPlans', [testPlan1, testPlan2]);
  });

  it('clears meal plans', async () => {
    await mealPlans.actions.clearMealPlans({commit});

    expect(commit).toBeCalledTimes(1);
    expect(commit).toHaveBeenCalledWith('resetMealPlans');
  });

  it('saves a new mealPlan', async () => {
    const newPlan = generateMealPlan(null, 'new meal plan');

    const expectedPlan = {
      ...newPlan,
      id: 3
    };

    const mockSave = jest.spyOn(LambdaAPI, 'saveMealPlans').mockImplementation();

    await mealPlans.actions.saveMealPlan({commit, state, rootGetters}, newPlan);

    expect(mockSave).toHaveBeenCalledTimes(1);
    expect(commit).toHaveBeenCalledTimes(1);
    expect(commit).toHaveBeenCalledWith('updateMealPlan', expectedPlan);
  });

  it('saves an updated meal plan', async () => {
    const mockSave = jest.spyOn(LambdaAPI, 'saveMealPlans').mockImplementation();

    await mealPlans.actions.saveMealPlan({commit, state, rootGetters}, testPlan1);

    expect(mockSave).toHaveBeenCalledTimes(1);
    expect(commit).toHaveBeenCalledTimes(1);
    expect(commit).toHaveBeenCalledWith('updateMealPlan', testPlan1);
  });

  it('deletes a meal plan by id', async () => {
    const mockSave = jest.spyOn(LambdaAPI, 'saveMealPlans').mockImplementation();

    await mealPlans.actions.deleteMealPlan({commit, state, rootGetters}, 1);

    expect(commit).toHaveBeenCalledTimes(1);
    expect(commit).toHaveBeenCalledWith('removeMealPlan', 1);
    expect(mockSave).toHaveBeenCalledTimes(1);
  });
});
