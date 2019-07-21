import { mount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import RecipeForm from '@/components/RecipeForm.vue';
import { Recipe } from '@/models/Recipe';
import { generateRecipe } from '../../helpers/recipe';

// this should really be localVue but Vuetify pollutes the Vue prototype and causes the tests to throw bad exceptions.
// See https://github.com/vuetifyjs/vuetify/issues/4861 and https://github.com/vuetifyjs/vuetify/issues/6046
Vue.use(Vuetify);
// suppress warning about data-app attribute:
// https://forum.vuejs.org/t/vuetify-data-app-true-and-problems-rendering-v-dialog-in-unit-tests/27495/9
document.body.setAttribute('data-app', 'true');

let mockRecipe: Recipe;
let mockStore: any;
let mockDispatch: jest.Mock;
let mockRouter: any;
let mockRoute: any;

describe('RecipeList.vue', () => {
  beforeEach(() => {
    mockRecipe = generateRecipe(1, 'test recipe 1', ['ingredient 1']);

    mockDispatch = jest.fn();
    mockStore = {
      dispatch: mockDispatch,
      getters: {
        'recipes/getRecipeById': jest.fn().mockImplementation((id: number) => {
          return mockRecipe;
        })
      }
    };

    mockRoute = {
      params: {
        id: mockRecipe.id
      }
    };

    mockRouter = {
      push: jest.fn()
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders an empty form', () => {
    mockRoute.params.id = null;
    const wrapper = mount(RecipeForm, {
      mocks: { $store: mockStore, $route: mockRoute }
    });

    expect(wrapper.find('.form-header').text()).toBe('Recipe - New');
    const textInput = wrapper.find('.recipe-name').find('input').element as HTMLInputElement;
    expect(textInput.value).toBe('');
    expect(wrapper.findAll('.rline-item').length).toBe(0);
  });

  it('renders recipe data', () => {
    const wrapper = mount(RecipeForm, {
      mocks: { $store: mockStore, $route: mockRoute }
    });

    expect(wrapper.find('.form-header').text()).toBe('Recipe - Edit');
    const textInput = wrapper.find('.recipe-name').find('input').element as HTMLInputElement;
    expect(textInput.value).toBe(mockRecipe.name);
    expect(wrapper.findAll('.rline-item').length).toBe(1);
  });

  it('shows an ingredient input', () => {
    const wrapper = mount(RecipeForm, {
      mocks: { $store: mockStore, $route: mockRoute }
    });

    expect(wrapper.contains('.add-ingredient-button')).toBe(true);
    expect(wrapper.contains('.add-ingredient-inputs')).toBe(false);

    wrapper.find('.add-ingredient-button').trigger('click');

    expect(wrapper.contains('.add-ingredient-button')).toBe(false);
    expect(wrapper.contains('.add-ingredient-inputs')).toBe(true);
  });

  it('adds an ingredient to the list', () => {
    const wrapper = mount(RecipeForm, {
      mocks: { $store: mockStore, $route: mockRoute }
    });

    wrapper.find('.add-ingredient-button').trigger('click');

    const input = wrapper.find('.add-ingredient-input').find('input');
    input.setValue('asdf');
    wrapper.find('.add-ingredient-confirm').trigger('click');

    expect(wrapper.contains('.add-ingredient-inputs')).toBe(false);
    expect(wrapper.findAll('.rline-item').length).toBe(2);
  });

  it('removes an ingredient from the list', () => {
    const wrapper = mount(RecipeForm, {
      mocks: { $store: mockStore, $route: mockRoute }
    });

    wrapper.find('.remove-item-button').trigger('click');

    expect(wrapper.contains('.rline-item')).toBe(false);
  });

  it('saves the recipe', () => {
    const wrapper = mount(RecipeForm, {
      mocks: { $store: mockStore, $route: mockRoute, $router: mockRouter }
    });

    const expectedRecipe = {
      ...mockRecipe,
      name: 'updated recipe name'
    };

    const textInput = wrapper.find('.recipe-name').find('input');
    textInput.setValue(expectedRecipe.name);

    wrapper.find('.save-button').trigger('click');

    expect(mockDispatch).toHaveBeenCalledWith('recipes/saveRecipe', expectedRecipe);
  });

  it('deletes the recipe', () => {
    const wrapper = mount(RecipeForm, {
      mocks: { $store: mockStore, $route: mockRoute, $router: mockRouter }
    });

    wrapper.find('.delete-button').trigger('click');

    expect(wrapper.contains('.confirmation-dialog')).toBe(true);

    wrapper.find('.dialog-confirmation-button').trigger('click');

    expect(mockDispatch).toHaveBeenCalledWith('recipes/deleteRecipe', mockRecipe.id);
  });
});
