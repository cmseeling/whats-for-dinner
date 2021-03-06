import { mount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import RandomRecipe from '@/components/RandomRecipe.vue';
import RecipeItem from '@/components/RecipeItem.vue';
import { Recipe } from '@/models/Recipe';
import { generateRecipe } from '../../helpers/recipe';

// this should really be localVue but Vuetify pollutes the Vue prototype and causes the tests to throw bad exceptions.
// See https://github.com/vuetifyjs/vuetify/issues/4861 and https://github.com/vuetifyjs/vuetify/issues/6046
Vue.use(Vuetify);

let vuetify: any;

let mockRecipe1: Recipe;
let mockRecipe2: Recipe;
let mockStore: any;
let recipes: Recipe[];
let mockGetRecipeByIndex: jest.Mock;

describe('RandomRecipe.vue', () => {
  beforeEach(() => {
    vuetify = new Vuetify();

    mockRecipe1 = generateRecipe(1, 'test recipe 1', ['ingredient 1']);
    mockRecipe2 = generateRecipe(2, 'test recipe 2', ['ingredient 1']);
    recipes = [mockRecipe1, mockRecipe2];
    mockGetRecipeByIndex = jest.fn().mockImplementation((index: number) => {
      // console.log(index);
      return recipes[index];
    });

    mockStore = {
      getters: {
        'recipes/recipeCount': recipes.length,
        'recipes/isInitialized': true,
        'recipes/getRecipeByIndex': mockGetRecipeByIndex
      }
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders a random recipe', () => {
    const wrapper = mount(RandomRecipe, {
      mocks: { $store: mockStore },
      vuetify
    });

    expect(wrapper.findAll(RecipeItem).length).toBe(1);
  });

  it('gets the next random recipe', () => {
    const wrapper = mount(RandomRecipe, {
      mocks: { $store: mockStore },
      vuetify
    });

    wrapper.find('.next-random-recipe').trigger('click');

    const mockCallArg = mockGetRecipeByIndex.mock.calls[0][0];
    // console.log(mockCallArg);
    expect(mockCallArg <= recipes.length).toBe(true);
  });

  it('emits the selected recipe id', () => {
    recipes = [mockRecipe1];
    mockStore.getters['recipes/recipeCount'] = recipes.length;

    const wrapper = mount(RandomRecipe, {
      mocks: { $store: mockStore },
      vuetify
    });

    wrapper.find('.recipe-title-button').trigger('click');

    expect(wrapper.emitted('recipe-add-click')[0]).toEqual([mockRecipe1.id]);
  });
});
