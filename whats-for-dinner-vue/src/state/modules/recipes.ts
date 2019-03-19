import { DefaultRecipesState, IRecipesState } from '../interfaces/RecipesState';
import { Recipe } from '@/models/Recipe';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';

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
    }
};

const mutations = {

};

const actions = {

};

export default {
    state: DefaultRecipesState(),
    namespaced: true,
    getters,
    mutations,
    actions
};
