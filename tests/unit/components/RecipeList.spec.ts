import { mount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import RecipeList from '@/components/RecipeList.vue';
import RecipeItem from '@/components/RecipeItem.vue';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';
import reduce from 'lodash/reduce';
import { Recipe } from '@/models/Recipe';
import { generateRecipe } from '../../helpers/recipe';

// this should really be localVue but Vuetify pollutes the Vue prototype and causes the tests to throw bad exceptions.
// See https://github.com/vuetifyjs/vuetify/issues/4861 and https://github.com/vuetifyjs/vuetify/issues/6046
Vue.use(Vuetify);

let vuetify: any;

let mockRecipe1: Recipe;
let mockRecipe2: Recipe;
let mockStore: any;

describe('RecipeList.vue', () => {
  beforeEach(() => {
    vuetify = new Vuetify();

    mockRecipe1 = generateRecipe(1, 'test recipe 1', ['ingredient 1']);
    mockRecipe2 = generateRecipe(2, 'test recipe 2', ['ingredient 1']);

    mockStore = {
      getters: {
        'recipes/getFilteredList': jest.fn().mockImplementation((filterText: string) => {
          const recipes = [mockRecipe1, mockRecipe2];
          if (filterText === '') {
            return recipes;
          } else {
            return filter(recipes, (recipe: Recipe) => {
              const existsInIngredients = reduce(recipe.ingredients, (prev, ingredient) => {
                return prev || includes(toLower(ingredient), toLower(filterText));
              }, false);
              return includes(toLower(recipe.name), toLower(filterText)) || existsInIngredients;
            });
          }
        })
      }
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders the list of recipes', () => {
    const wrapper = mount(RecipeList, {
      mocks: { $store: mockStore },
      vuetify
    });

    expect(wrapper.findAll(RecipeItem).length).toBe(2);
  });

  it('renders a filtered list of recipes', () => {
    const wrapper = mount(RecipeList, {
      mocks: { $store: mockStore },
      vuetify
    });

    const input = wrapper.find('input');
    input.setValue(mockRecipe2.name);

    expect(wrapper.findAll(RecipeItem).length).toBe(1);
  });
});
