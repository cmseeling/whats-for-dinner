import find from 'lodash/find';
import flatMap from 'lodash/flatMap';
import includes from 'lodash/includes';
import uniq from 'lodash/uniq';
import { Recipe } from '@/models/recipe';

function getMockGetters(recipes: Recipe[], initializationState: boolean) {
  return {
    getFilteredList: jest.fn().mockImplementation(() => () => {
      return recipes;
    }),

    getRecipeById: jest.fn().mockImplementation(() => (id: number) => {
      const recipe = find(recipes, (r) => {
        return r.id && r.id === id;
      });
      // console.log(`${id} | ${recipes} | ${recipe}`);
      return recipe;
    }),

    getRecipeByIndex: jest.fn().mockImplementation(() => (index: number) => {
      return recipes[index];
    }),

    getIngredientsFromRecipeIds: jest.fn().mockImplementation(() => (recipeIds: number[]) => {
      return uniq(flatMap(recipes, (recipe) => {
        if (includes(recipeIds, recipe.id)) {
          return recipe.ingredients;
        } else {
          return [];
        }
      }));
    }),

    recipeCount: jest.fn().mockImplementation(() => () => {
      return recipes.length;
    }),

    isInitialized: jest.fn().mockImplementation(() => () => {
      return initializationState;
    })
  };
}

function getMockMutations() {
  return {
    updateRecipe: jest.fn(),
    resetRecipes: jest.fn(),
    addRecipes: jest.fn(),
    removeRecipe: jest.fn(),
    setInitialized: jest.fn()
  };
}

function getMockActions() {
  return {
    saveRecipe: jest.fn(),
    deleteRecipe: jest.fn()
  };
}

const RecipeMocks = {
  getMockGetters,
  getMockMutations,
  getMockActions
};
export default RecipeMocks;
