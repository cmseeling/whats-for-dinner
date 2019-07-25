import { mount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import RecipeItem from '@/components/RecipeItem.vue';
import { Recipe } from '@/models/Recipe';
import { generateRecipe } from '../../helpers/recipe';

// this should really be localVue but Vuetify pollutes the Vue prototype and causes the tests to throw bad exceptions.
// See https://github.com/vuetifyjs/vuetify/issues/4861 and https://github.com/vuetifyjs/vuetify/issues/6046
Vue.use(Vuetify);

let vuetify: any;

let mockRecipe: Recipe;

describe('RecipeItem.vue', () => {
  beforeEach(() => {
    vuetify = new Vuetify();

    mockRecipe = generateRecipe(1, 'test recipe', ['ingredient 1', 'ingredient 2']);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders the recipe name', () => {
    const wrapper = mount(RecipeItem, {
      propsData: { recipe: mockRecipe },
      vuetify
    });

    expect(wrapper.find('.recipe-title').text()).toBe(mockRecipe.name);
  });

  it('renders the ingredient list', () => {
    const wrapper = mount(RecipeItem, {
      propsData: { recipe: mockRecipe },
      vuetify
    });

    wrapper.find('.v-expansion-panel-header').trigger('click');
    expect(wrapper.findAll('.recipe-ingredient-name').length).toBe(mockRecipe.ingredients.length);
  });

  it('emits the recipe id on name click', () => {
    const wrapper = mount(RecipeItem, {
      propsData: { recipe: mockRecipe },
      vuetify
    });

    wrapper.find('.recipe-title-button').trigger('click');

    expect(wrapper.emitted('recipe-click')[0]).toEqual([mockRecipe.id]);
  });
});
