import { Commit } from 'vuex';
import { DefaultRecipesState, RecipesState } from '../interfaces/RecipesState';
import { IRecipe } from '@/models/recipe';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';
import flatMap from 'lodash/flatMap';
import forEach from 'lodash/forEach';
import uniq from 'lodash/uniq';
import reduce from 'lodash/reduce';
import Recipes from '@/api/Recipes';
import { Dictionary } from '@/utils/Dictionary';

const getters = {
  getFilteredList: (state: RecipesState) => (filterString: string): IRecipe[] => {
    const recipes = state.recipes.Values();
    if (filterString === '') {
      return recipes;
    } else {
      return filter(recipes, (recipe: IRecipe) => {
        const existsInIngredients = reduce(recipe.ingredients, (prev, ingredient) => {
          return prev || includes(toLower(ingredient), toLower(filterString));
        }, false);
        return includes(toLower(recipe.name), toLower(filterString)) || existsInIngredients;
      });
    }
  },

  getRecipeById: (state: RecipesState) => (id: string): IRecipe => {
    return state.recipes.Item(id);
  },

  getRecipeByIndex: (state: RecipesState) => (index: number): IRecipe => {
    return state.recipes.Values()[index];
  },

  recipes: (state: RecipesState): IRecipe[] => {
    return state.recipes.Values();
  },

  getIngredientsFromRecipeIds: (state: RecipesState) => (recipeIds: number[]): string[] => {
    return uniq(flatMap(state.recipes.Values(), (recipe: IRecipe) => {
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
  updateRecipe: (state: RecipesState, recipe: IRecipe): void => {
    if (recipe.id) {
      state.recipes.Upsert(recipe.id.toString(), recipe);
    } else {
      throw new Error('Recipe Id is null.');
    }
  },

  resetRecipes: (state: RecipesState): void => {
    state.recipes = new Dictionary<IRecipe>();
  },

  addRecipes: (state: RecipesState, recipes: IRecipe[]): void => {
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
  init: async ({commit}: {commit: Commit}): Promise<void> => {
    const recipes = await Recipes.readAll();
    commit('resetRecipes');
    commit('addRecipes', recipes);
    commit('setInitialized');
  },

  saveRecipe: async ({commit}: {commit: Commit}, recipe: IRecipe): Promise<void> => {
    if (recipe.id) {
      const updatedRecipe = await Recipes.update(recipe.id, recipe);
      commit('updateRecipe', updatedRecipe);
    } else {
      const newRecipe = await Recipes.create(recipe);
      commit('updateRecipe', newRecipe);
    }
  },

  deleteRecipe: async ({commit}: {commit: Commit}, id: number): Promise<void> => {
    commit('removeRecipe', id);
    await Recipes.deleteItem(id);
  }
};

export default {
  state: DefaultRecipesState(),
  namespaced: true,
  getters,
  mutations,
  actions
};
