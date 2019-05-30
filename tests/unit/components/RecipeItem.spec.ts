import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import RecipeItem from '@/components/RecipeItem.vue';
import { Recipe } from '@/models/recipe';
import { generateRecipe } from '../../helpers/recipe';

const localVue = createLocalVue();
localVue.use(Vuetify);

let mockRecipe: Recipe;

describe('RecipeItem.vue', () => {
  beforeEach(() => {
    mockRecipe = generateRecipe(1, 'test recipe', ['ingredient 1', 'ingredient 2']);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders the recipe name', () => {
    const wrapper = shallowMount(RecipeItem, {
      propsData: { recipe: mockRecipe },
      localVue
    });

    expect(wrapper.find('.recipe-title').text()).toBe(mockRecipe.name);
  });

  it('renders the ingredient list', () => {
    const wrapper = shallowMount(RecipeItem, {
      propsData: { recipe: mockRecipe },
      localVue
    });

    expect(wrapper.findAll('.recipe-ingredient-name').length).toBe(mockRecipe.ingredients.length);
  });

  it('emits the recipe id on name click', () => {
    const wrapper = mount(RecipeItem, {
      propsData: { recipe: mockRecipe },
      localVue
    });

    wrapper.find('.recipe-title-button').trigger('click');

    expect(wrapper.emitted('recipe-click')[0]).toEqual([mockRecipe.id]);
  });
});
