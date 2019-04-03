import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';
import MealSlot from '@/components/MealSlot.vue';
import { Recipe } from '@/models/recipe';

const localVue = createLocalVue();
localVue.use(Vuex);

const mockRecipe: Recipe = {
  id: 1,
  ingredients: [
    'ingredient 1'
  ],
  name: 'test recipe'
};

const mockGetRecipeById = jest.fn().mockImplementation(() => (id: number): Recipe => {
  return mockRecipe;
});

const mockRemoveRecipeFromMealSlot = jest.fn();

let store: Store<any>;

describe('MealSlot.vue', () => {
  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        recipes: {
          namespaced: true,
          getters: {
            getRecipeById: mockGetRecipeById
          }
        },
        schedule: {
          namespaced: true,
          mutations: {
            removeRecipeFromMealSlot: mockRemoveRecipeFromMealSlot
          }
        }
      }
    });
  });

  it('renders message if recipe array is empty', () => {
    const slotId = 1;
    const recipeIds: number[] = [];
    const wrapper = shallowMount(MealSlot, {
      propsData: { slotId, recipeIds }
    });
    expect(wrapper.find('.no-item').text()).toMatch('None selected');
  });

  it('renders a list of recipes', () => {
    const slotId = 1;
    const recipeIds: number[] = [1];
    const wrapper = shallowMount(MealSlot, {
      propsData: { slotId, recipeIds },
      store,
      localVue
    });
    expect(mockGetRecipeById).toBeCalledTimes(1);
    expect(wrapper.find('.meal-slot-recipe-name').text()).toMatch(mockRecipe.name);
  });

  it('removes a recipe from the list', () => {
    const slotId = 1;
    const recipeIds: number[] = [1];
    const wrapper = shallowMount(MealSlot, {
      propsData: { slotId, recipeIds },
      store,
      localVue
    });

    wrapper.find('.close').trigger('click');

    expect(mockRemoveRecipeFromMealSlot).toBeCalledTimes(1);
  });
});
