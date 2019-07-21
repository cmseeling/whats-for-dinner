import { Commit } from 'vuex';
import { DefaultRecipesState, RecipesState } from '../interfaces/RecipesState';
import { Recipe } from '@/models/Recipe';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';
import flatMap from 'lodash/flatMap';
import forEach from 'lodash/forEach';
import max from 'lodash/max';
import uniq from 'lodash/uniq';
import reduce from 'lodash/reduce';
import { Dictionary } from '@/utils/Dictionary';
import LambdaAPI from '@/api/LambdaAPI';

const getters = {
  recipes: (state: RecipesState): Recipe[] => {
    return state.recipes.Values();
  },

  getFilteredList: (state: RecipesState) => (filterString: string): Recipe[] => {
    const recipes = state.recipes.Values();
    if (filterString === '') {
      return recipes;
    } else {
      return filter(recipes, (recipe: Recipe) => {
        const existsInIngredients = reduce(recipe.ingredients, (prev, ingredient) => {
          return prev || includes(toLower(ingredient), toLower(filterString));
        }, false);
        return includes(toLower(recipe.name), toLower(filterString)) || existsInIngredients;
      });
    }
  },

  getRecipeById: (state: RecipesState) => (id: string): Recipe => {
    return state.recipes.Item(id);
  },

  getRecipeByIndex: (state: RecipesState) => (index: number): Recipe => {
    return state.recipes.Values()[index];
  },

  getIngredientsFromRecipeIds: (state: RecipesState) => (recipeIds: number[]): string[] => {
    return uniq(flatMap(state.recipes.Values(), (recipe: Recipe) => {
      if (includes(recipeIds, recipe.id)) {
        return recipe.ingredients;
      } else {
        return [];
      }
    }));
  },

  recipeCount: (state: RecipesState): number => {
    return state.recipes.Count();
  },

  isInitialized: (state: RecipesState): boolean => {
    return state.initialized;
  }
};

const mutations = {
  updateRecipe: (state: RecipesState, recipe: Recipe): void => {
    if (recipe.id) {
      state.recipes.Upsert(recipe.id.toString(), recipe);
    } else {
      throw new Error('Recipe Id is null.');
    }
  },

  resetRecipes: (state: RecipesState): void => {
    state.recipes = new Dictionary<Recipe>();
  },

  addRecipes: (state: RecipesState, recipes: Recipe[]): void => {
    forEach(recipes, (item) => {
      if (item.id) {
        state.recipes.Upsert(item.id.toString(), item);
      }
    });
  },

  removeRecipe: (state: RecipesState, id: number): void => {
    state.recipes.Remove(id.toString());
  },

  setInitialized: (state: RecipesState): void => {
    state.initialized = true;
  }
};

const actions = {
  setRecipes: ({commit}: {commit: Commit}, recipes: Recipe[]): void => {
    commit('resetRecipes');
    commit('addRecipes', recipes);
    commit('setInitialized');
  },

  clearRecipes: ({commit}: {commit: Commit}): void => {
    commit('resetRecipes');
  },

  saveRecipe: async ({commit, state}: {commit: Commit, state: RecipesState}, recipe: Recipe): Promise<void> => {
    let recipeData;
    if (recipe.id) {
      recipeData = {...recipe};
    } else {
      const maxId = max(state.recipes.Keys());
      let newId;
      if (maxId) {
        newId = +maxId + 1;
      } else {
        newId = 1;
      }
      recipeData = {...recipe, id: newId};
    }

    commit('updateRecipe', recipeData);
    await LambdaAPI.saveRecipes(state.recipes.Values());
  },

  deleteRecipe: async ({commit, state}: {commit: Commit, state: RecipesState}, id: number): Promise<void> => {
    commit('removeRecipe', id);
    await LambdaAPI.saveRecipes(state.recipes.Values());
  }
};

export default {
  state: DefaultRecipesState(),
  namespaced: true,
  getters,
  mutations,
  actions
};
