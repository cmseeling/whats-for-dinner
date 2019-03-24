import { Commit } from 'vuex';
import { DefaultRecipesState, IRecipesState } from '../interfaces/RecipesState';
import { Recipe } from '@/models/Recipe';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';
import flatMap from 'lodash/flatMap';
import forEach from 'lodash/forEach';
import uniq from 'lodash/uniq';
import Recipes from '@/api/Recipes';

const getters = {
    getFilteredList: (state: IRecipesState) => (filterString: string): Recipe[] => {
        const recipes = state.recipes.Values();
        if (filterString === '') {
            return recipes;
        } else {
            return filter(recipes, (recipe: Recipe) => {
              return includes(toLower(recipe.name), toLower(filterString));
          });
        }
    },

    getRecipeById: (state: IRecipesState) => (id: string): Recipe => {
        return state.recipes.Item(id);
    },

    recipes: (state: IRecipesState): Recipe[] => {
        return state.recipes.Values();
    },

    getIngredientsFromRecipeIds: (state: IRecipesState) => (recipeIds: number[]): string[] => {
        return uniq(flatMap(state.recipes.Values(), (recipe: Recipe) => {
            if (includes(recipeIds, recipe.id)) {
                return recipe.ingredients;
            } else {
                return [];
            }
        }));
    },

    recipeCount: (state: IRecipesState): number => {
        return state.recipes.Count();
    }
};

const mutations = {
    updateRecipe: (state: IRecipesState, recipe: Recipe): void => {
        if (recipe.id) {
            state.recipes.Upsert(recipe.id.toString(), recipe);
        } else {
            throw new Error('Recepe Id is null.');
        }
    },

    setRecipes: (state: IRecipesState, recipes: Recipe[]): void => {
        forEach(recipes, (item) => {
            if (item.id) {
                state.recipes.Upsert(item.id.toString(), item);
            }
        });
    }
};

const actions = {
    init: async ({commit}: {commit: Commit}): Promise<void> => {
        const recipes = await Recipes.readAll();
        commit('setRecipes', recipes);
    },

    saveRecipe: async ({commit}: {commit: Commit}, recipe: Recipe): Promise<void> => {
        if (recipe.id) {
            const updatedRecipe = await Recipes.update(recipe.id, recipe);
            commit('updateRecipe', updatedRecipe);
        } else {
            const newRecipe = await Recipes.create(recipe);
            commit('updateRecipe', newRecipe);
        }
    }
};

export default {
    state: DefaultRecipesState(),
    namespaced: true,
    getters,
    mutations,
    actions
};
