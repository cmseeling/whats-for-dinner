import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import MobileSlot from '@/components/mobileScheduleLayout/MobileSlot.vue';
import { Recipe } from '@/models/Recipe';
import { AugmentedSlot } from '@/models/AugmentedSlot';
import { generateRecipe } from '../../helpers/recipe';


const localVue = createLocalVue();
localVue.use(Vuetify);

let mealSlot: AugmentedSlot;
let setActive: jest.Mock;
let recipeIds: number[];
let mockRecipe1: Recipe;
let mockRecipe2: Recipe;
let mockStore: any;

describe('MobileSlot.vue', () => {
  beforeEach(() => {
    setActive = jest.fn();
    recipeIds = [1, 2];

    mockRecipe1 = generateRecipe(1, 'test recipe', ['ingredient 1']);
    mockRecipe2 = generateRecipe(2, 'test recipe', ['ingredient 1']);

    mockStore = {
      commit: jest.fn(),
      getters: {
        'recipes/getRecipeById': jest.fn().mockImplementation((id: number) => {
          switch (id) {
            case 1:
              return mockRecipe1;
              break;
            case 2:
              return mockRecipe2;
              break;
            default:
              return null;
          }
        })
      }
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders the slot name', () => {
    mealSlot = {
      id: 1,
      dayIndex: 0,
      mealIndex: 0,
      recipeIds,
      selected: false
    };

    const wrapper = shallowMount(MobileSlot, {
      propsData: {mealSlot, setActive},
      mocks: { $store: mockStore },
      localVue
    });

    expect(wrapper.find('.mobile-slot-title').text()).toBe('Breakfast');
  });

  it('renders a list of recipes', () => {
    mealSlot = {
      id: 1,
      dayIndex: 0,
      mealIndex: 0,
      recipeIds,
      selected: false
    };

    const wrapper = shallowMount(MobileSlot, {
      propsData: {mealSlot, setActive},
      mocks: { $store: mockStore },
      localVue
    });

    expect(wrapper.findAll('.recipe-list-name').length).toBe(2);
    expect(wrapper.findAll('.recipe-list-name').wrappers[0].text()).toMatch(mockRecipe1.name);
    expect(wrapper.findAll('.recipe-list-name').wrappers[1].text()).toMatch(mockRecipe2.name);
  });

  it('applies the selected class', () => {
    mealSlot = {
      id: 1,
      dayIndex: 0,
      mealIndex: 0,
      recipeIds,
      selected: false
    };

    let wrapper = shallowMount(MobileSlot, {
      propsData: {mealSlot, setActive},
      mocks: { $store: mockStore },
      localVue
    });
    expect(wrapper.contains('.selected')).toBe(false);

    mealSlot.selected = true;
    wrapper = shallowMount(MobileSlot, {
      propsData: {mealSlot, setActive},
      mocks: { $store: mockStore },
      localVue
    });
    expect(wrapper.contains('.selected')).toBe(true);
  });

  it('calls setActive', () => {
    mealSlot = {
      id: 1,
      dayIndex: 0,
      mealIndex: 0,
      recipeIds,
      selected: false
    };

    const wrapper = mount(MobileSlot, {
      propsData: {mealSlot, setActive},
      mocks: { $store: mockStore },
      localVue
    });

    wrapper.trigger('click');
    expect(setActive).toHaveBeenCalled();
  });

  it('removes a recipe from the list', () => {
    mealSlot = {
      id: 1,
      dayIndex: 0,
      mealIndex: 0,
      recipeIds,
      selected: false
    };

    const wrapper = mount(MobileSlot, {
      propsData: {mealSlot, setActive},
      mocks: { $store: mockStore },
      localVue
    });

    const expectedValue = {
      slotId: mealSlot.id,
      recipeId: recipeIds[0]
    };

    wrapper.findAll('.recipe-list-remove-button').wrappers[0].trigger('click');

    expect(mockStore.commit).toHaveBeenCalledWith('schedule/removeRecipeFromMealSlot', expectedValue);
  });
});
