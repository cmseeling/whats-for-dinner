import { mount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import flatten from 'lodash/flatten';
import GroceryList from '@/components/GroceryList.vue';
import { Recipe } from '@/models/Recipe';
import { generateRecipe } from '../../helpers/recipe';

// this should really be localVue but Vuetify pollutes the Vue prototype and causes the tests to throw bad exceptions.
// See https://github.com/vuetifyjs/vuetify/issues/4861 and https://github.com/vuetifyjs/vuetify/issues/6046
Vue.use(Vuetify);

let mockRecipe1: Recipe;
let mockRecipe2: Recipe;
let mockStore: any;
let recipeIds: number[];

describe('RecipeList.vue', () => {
  beforeEach(() => {
    mockRecipe1 = generateRecipe(1, 'test recipe 1', ['ingredient 1']);
    mockRecipe2 = generateRecipe(2, 'test recipe 2', ['ingredient 2']);
    recipeIds = [mockRecipe1.id as number, mockRecipe2.id as number];

    mockStore = {
      getters: {
        'schedule/getAllUniqueRecipeIdsFromMealSlots': recipeIds,
        'recipes/getIngredientsFromRecipeIds': jest.fn().mockImplementation((ids: number[]) => {
          return flatten([mockRecipe1.ingredients, mockRecipe2.ingredients]);
        })
      }
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders the list of ingredients', async () => {
    const wrapper = mount(GroceryList, {
      mocks: { $store: mockStore }
    });

    // wait for the component to update the list
    await wrapper.vm.$nextTick();

    expect(wrapper.findAll('.line-item').length).toBe(2);
  });

  it('adds an ingredient', async () => {
    const wrapper = mount(GroceryList, {
      mocks: { $store: mockStore }
    });

    // wait for the component to update the list
    await wrapper.vm.$nextTick();

    wrapper.find('.add-ingredient-button').trigger('click');

    const input = wrapper.find('.add-ingredient-input').find('input');
    input.setValue('asdf');
    wrapper.find('.add-ingredient-confirm').trigger('click');

    expect(wrapper.contains('.add-ingredient-inputs')).toBe(false);
    expect(wrapper.findAll('.line-item').length).toBe(3);
  });

  it('removes an ingredient', async () => {
    const wrapper = mount(GroceryList, {
      mocks: { $store: mockStore }
    });

    // wait for the component to update the list
    await wrapper.vm.$nextTick();

    wrapper.findAll('.remove-item-button').wrappers[0].trigger('click');

    expect(wrapper.findAll('.line-item').length).toBe(1);
  });
});
