import recipes from '@/state/modules/recipes';
import Recipes from '@/api/Recipes';
import { DefaultRecipesState, RecipesState } from '@/state/interfaces/RecipesState';
import { IRecipe } from '@/models/recipe';
import { Dictionary } from '@/utils/Dictionary';

let state: RecipesState;
let testRecipe1: IRecipe;
let testRecipe2: IRecipe;
let mockReadAll: jest.SpyInstance;
let commit: jest.Mock;

describe('recipes.ts', () => {
  beforeEach(() => {
    testRecipe1 = {
      id: 1,
      ingredients: [
        'ingredient 1',
        'special ingredient 2'
      ],
      name: 'recipe one'
    };

    testRecipe2 = {
      id: 2,
      ingredients: [
        'ingredient 3',
        'ingredient 4'
      ],
      name: 'recipe two'
    };

    state = DefaultRecipesState();
    state.recipes.Upsert('1', testRecipe1);
    state.recipes.Upsert('2', testRecipe2);

    commit = jest.fn();
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
    expectedState.recipes = new Dictionary<IRecipe>();

    recipes.mutations.resetRecipes(state);

    expect(state).toEqual(expectedState);
  });

  it('adds recipes from a list', () => {
    const newRecipe1: IRecipe = {
      id: 3,
      ingredients: [],
      name: 'new recipe 1'
    };
    const newRecipe2: IRecipe = {
      id: 4,
      ingredients: [],
      name: 'new recipe 2'
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

  it('initializes the state', async () => {
    mockReadAll = jest.spyOn(Recipes, 'readAll').mockImplementation(async () => {
      return [testRecipe1, testRecipe2];
    });

    await recipes.actions.init({commit});

    expect(mockReadAll).toBeCalledTimes(1);
    expect(commit).toBeCalledTimes(3);
    expect(commit).toHaveBeenNthCalledWith(1, 'resetRecipes');
    expect(commit).toHaveBeenNthCalledWith(2, 'addRecipes', [testRecipe1, testRecipe2]);
    expect(commit).toHaveBeenNthCalledWith(3, 'setInitialized');
  });

  it('saves a new recipe', async () => {
    const newRecipe: IRecipe = {
      id: null,
      ingredients: [],
      name: 'new recipe'
    };

    const expectedRecipe = {
      ...newRecipe,
      id: 3
    };

    const mockCreate = jest.spyOn(Recipes, 'create').mockImplementation(async () => {
      return expectedRecipe;
    });

    await recipes.actions.saveRecipe({commit}, newRecipe);

    expect(mockCreate).toHaveBeenCalledTimes(1);
    expect(commit).toHaveBeenCalledTimes(1);
    expect(commit).toHaveBeenCalledWith('updateRecipe', expectedRecipe);
  });

  it('saves an updated recipe', async () => {
    const mockUpdate = jest.spyOn(Recipes, 'update').mockImplementation(async () => {
      return testRecipe1;
    });

    await recipes.actions.saveRecipe({commit}, testRecipe1);

    expect(mockUpdate).toHaveBeenCalledTimes(1);
    expect(commit).toHaveBeenCalledTimes(1);
    expect(commit).toHaveBeenCalledWith('updateRecipe', testRecipe1);
  });

  it('deletes a recipe by id', async () => {
    const mockDelete = jest.spyOn(Recipes, 'deleteItem')
      .mockImplementation(async () => { console.log('mock delete'); });

    await recipes.actions.deleteRecipe({commit}, 1);

    expect(commit).toHaveBeenCalledTimes(1);
    expect(commit).toHaveBeenCalledWith('removeRecipe', 1);
    expect(mockDelete).toHaveBeenCalledTimes(1);
  });
});
