import recipes from '@/state/modules/recipes';
import LambdaAPI from '@/api/LambdaAPI';
import { DefaultRecipesState, RecipesState } from '@/state/interfaces/RecipesState';
import { Recipe } from '@/models/Recipe';
import { Dictionary } from '@/utils/Dictionary';

let state: RecipesState;
let testRecipe1: Recipe;
let testRecipe2: Recipe;
let commit: jest.Mock;
let mockUser: any;

describe('recipes.ts', () => {
  beforeEach(() => {
    testRecipe1 = {
      id: 1,
      ingredients: [
        'ingredient 1',
        'special ingredient 2'
      ],
      name: 'recipe one',
      instructions: ''
    };

    testRecipe2 = {
      id: 2,
      ingredients: [
        'ingredient 3',
        'ingredient 4'
      ],
      name: 'recipe two',
      instructions: ''
    };

    state = DefaultRecipesState();
    state.recipes.Upsert('1', testRecipe1);
    state.recipes.Upsert('2', testRecipe2);

    commit = jest.fn();

    mockUser = {
      email: 'test@test.com'
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('gets a filtered list of recipes', () => {
    expect(recipes.getters.getFilteredList(state)('special')).toEqual([testRecipe1]);
    expect(recipes.getters.getFilteredList(state)('two')).toEqual([testRecipe2]);
  });

  it('gets a recipe by its id', () => {
    expect(recipes.getters.getRecipeById(state)('1')).toEqual(testRecipe1);
  });

  it('gets a recipe by its index', () => {
    expect(recipes.getters.getRecipeByIndex(state)(1)).toEqual(testRecipe2);
  });

  it('gets all of the recipes', () => {
    expect(recipes.getters.recipes(state)).toEqual([testRecipe1, testRecipe2]);
  });

  it('gets the ingredients from recipes', () => {
    expect(recipes.getters.getIngredientsFromRecipeIds(state)([1])).toEqual([
      'ingredient 1',
      'special ingredient 2'
    ]);

    expect(recipes.getters.getIngredientsFromRecipeIds(state)([1, 2])).toEqual([
      'ingredient 1',
      'special ingredient 2',
      'ingredient 3',
      'ingredient 4'
    ]);
  });

  it('gets the number of recipes', () => {
    expect(recipes.getters.recipeCount(state)).toBe(2);
  });

  it('gets the initialization state', () => {
    expect(recipes.getters.isInitialized(state)).toBe(false);
  });

  it('updates a recipe', () => {
    const updatedRecipe = {
      ...testRecipe1,
      name: 'updated name of recipe 1'
    };

    const expectedState = {...state};
    expectedState.recipes.Upsert('1', updatedRecipe);

    recipes.mutations.updateRecipe(state, updatedRecipe);

    expect(state).toEqual(expectedState);
  });

  it('resets the recipe list', () => {
    const expectedState = {...state};
    expectedState.recipes = new Dictionary<Recipe>();

    recipes.mutations.resetRecipes(state);

    expect(state).toEqual(expectedState);
  });

  it('adds recipes from a list', () => {
    const newRecipe1: Recipe = {
      id: 3,
      ingredients: [],
      name: 'new recipe 1',
      instructions: ''
    };
    const newRecipe2: Recipe = {
      id: 4,
      ingredients: [],
      name: 'new recipe 2',
      instructions: ''
    };

    const expectedState = {...state};
    expectedState.recipes.Upsert('3', newRecipe1);
    expectedState.recipes.Upsert('4', newRecipe2);

    recipes.mutations.addRecipes(state, [newRecipe1, newRecipe2]);

    expect(state).toEqual(expectedState);
  });

  it('removes a recipe by id', () => {
    const expectedState = {...state};
    expectedState.recipes.Remove('2');

    recipes.mutations.removeRecipe(state, 2);

    expect(state).toEqual(expectedState);
  });

  it('sets initalized to true', () => {
    const expectedState = {...state};
    expectedState.initialized = true;

    recipes.mutations.setInitialized(state);

    expect(state).toEqual(expectedState);
  });

  it('sets recipes', async () => {
    const recipeArray = [testRecipe1, testRecipe2];

    await recipes.actions.setRecipes({commit}, recipeArray);

    expect(commit).toBeCalledTimes(3);
    expect(commit).toHaveBeenNthCalledWith(1, 'resetRecipes');
    expect(commit).toHaveBeenNthCalledWith(2, 'addRecipes', [testRecipe1, testRecipe2]);
    expect(commit).toHaveBeenNthCalledWith(3, 'setInitialized');
  });

  it('clears recipes', async () => {
    await recipes.actions.clearRecipes({commit});

    expect(commit).toBeCalledTimes(1);
    expect(commit).toHaveBeenCalledWith('resetRecipes');
  });

  it('saves a new recipe', async () => {
    const newRecipe: Recipe = {
      id: null,
      ingredients: [],
      name: 'new recipe',
      instructions: ''
    };

    const expectedRecipe = {
      ...newRecipe,
      id: 3
    };

    const mockSave = jest.spyOn(LambdaAPI, 'saveRecipes').mockImplementation();

    await recipes.actions.saveRecipe({commit, state}, newRecipe);

    expect(mockSave).toHaveBeenCalledTimes(1);
    expect(commit).toHaveBeenCalledTimes(1);
    expect(commit).toHaveBeenCalledWith('updateRecipe', expectedRecipe);
  });

  it('saves an updated recipe', async () => {
    const mockSave = jest.spyOn(LambdaAPI, 'saveRecipes').mockImplementation();

    await recipes.actions.saveRecipe({commit, state}, testRecipe1);

    expect(mockSave).toHaveBeenCalledTimes(1);
    expect(commit).toHaveBeenCalledTimes(1);
    expect(commit).toHaveBeenCalledWith('updateRecipe', testRecipe1);
  });

  it('deletes a recipe by id', async () => {
    const mockSave = jest.spyOn(LambdaAPI, 'saveRecipes').mockImplementation();

    await recipes.actions.deleteRecipe({commit, state}, 1);

    expect(commit).toHaveBeenCalledTimes(1);
    expect(commit).toHaveBeenCalledWith('removeRecipe', 1);
    expect(mockSave).toHaveBeenCalledTimes(1);
  });
});
