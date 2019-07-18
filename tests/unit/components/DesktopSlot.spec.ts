import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import DesktopSlot from '@/components/desktopScheduleLayout/DesktopSlot.vue';
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

describe('DesktopSlot.vue', () => {
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

  it('renders the count of recipes if collapsed', () => {
    const expanded = false;
    mealSlot = {
      id: 1,
      dayIndex: 0,
      mealIndex: 0,
      recipeIds,
      selected: false
    };

    const wrapper = shallowMount(DesktopSlot, {
      propsData: {mealSlot, expanded, setActive},
      mocks: { $store: mockStore },
      localVue,
      stubs: ['router-link']
    });

    expect(wrapper.find('.collapsed-display').isVisible()).toBe(true);
    expect(wrapper.find('.meal-slot').isVisible()).toBe(false);
    expect(wrapper.find('.collapsed-display').text()).toMatch(recipeIds.length.toString());
  });

  it('renders a placeholder if expanded but no recipes', () => {
    const expanded = true;
    mealSlot = {
      id: 1,
      dayIndex: 0,
      mealIndex: 0,
      recipeIds: [],
      selected: false
    };

    const wrapper = shallowMount(DesktopSlot, {
      propsData: {mealSlot, expanded, setActive},
      mocks: { $store: mockStore },
      localVue,
      stubs: ['router-link']
    });

    expect(wrapper.find('.collapsed-display').isVisible()).toBe(false);
    expect(wrapper.find('.meal-slot').isVisible()).toBe(true);
    expect(wrapper.find('.empty-slot').isVisible()).toBe(true);
    expect(wrapper.contains('.recipe-list')).toBe(false);
    expect(wrapper.find('.empty-slot').text()).toMatch('None Selected');
  });

  it('renders the list of recipes when expanded', () => {
    const expanded = true;
    mealSlot = {
      id: 1,
      dayIndex: 0,
      mealIndex: 0,
      recipeIds,
      selected: false
    };

    const wrapper = shallowMount(DesktopSlot, {
      propsData: {mealSlot, expanded, setActive},
      mocks: { $store: mockStore },
      localVue,
      stubs: ['router-link']
    });

    expect(wrapper.find('.collapsed-display').isVisible()).toBe(false);
    expect(wrapper.find('.meal-slot').isVisible()).toBe(true);
    expect(wrapper.contains('.empty-slot')).toBe(false);
    expect(wrapper.find('.recipe-list').isVisible()).toBe(true);
    expect(wrapper.findAll('.recipe-list-name').length).toBe(2);
    expect(wrapper.findAll('.recipe-list-name').wrappers[0].text()).toMatch(mockRecipe1.name);
    expect(wrapper.findAll('.recipe-list-name').wrappers[1].text()).toMatch(mockRecipe2.name);
  });

  it('applies the selected class', () => {
    const expanded = true;
    mealSlot = {
      id: 1,
      dayIndex: 0,
      mealIndex: 0,
      recipeIds,
      selected: false
    };

    let wrapper = shallowMount(DesktopSlot, {
      propsData: {mealSlot, expanded, setActive},
      mocks: { $store: mockStore },
      localVue,
      stubs: ['router-link']
    });

    expect(wrapper.find('.collapsed-display').isVisible()).toBe(false);
    expect(wrapper.find('.meal-slot').isVisible()).toBe(true);
    expect(wrapper.contains('.selected')).toBe(false);

    mealSlot.selected = true;
    wrapper = shallowMount(DesktopSlot, {
      propsData: {mealSlot, expanded, setActive},
      mocks: { $store: mockStore },
      localVue,
      stubs: ['router-link']
    });

    expect(wrapper.find('.collapsed-display').isVisible()).toBe(false);
    expect(wrapper.find('.meal-slot').isVisible()).toBe(true);
    expect(wrapper.contains('.selected')).toBe(true);
  });

  it('calls setActive if expanded', () => {
    let expanded = false;
    mealSlot = {
      id: 1,
      dayIndex: 0,
      mealIndex: 0,
      recipeIds,
      selected: false
    };

    let wrapper = shallowMount(DesktopSlot, {
      propsData: {mealSlot, expanded, setActive},
      mocks: { $store: mockStore },
      localVue,
      stubs: ['router-link']
    });

    wrapper.find('.slot-container').trigger('click');
    expect(setActive).not.toHaveBeenCalled();

    expanded = true;
    wrapper = shallowMount(DesktopSlot, {
      propsData: {mealSlot, expanded, setActive},
      mocks: { $store: mockStore },
      localVue,
      stubs: ['router-link']
    });

    wrapper.find('.slot-container').trigger('click');
    expect(setActive).toHaveBeenCalled();
  });

  it('removes a recipe from the list', () => {
    const expanded = true;
    mealSlot = {
      id: 1,
      dayIndex: 0,
      mealIndex: 0,
      recipeIds,
      selected: false
    };

    const wrapper = mount(DesktopSlot, {
      propsData: {mealSlot, expanded, setActive},
      mocks: { $store: mockStore },
      localVue,
      stubs: ['router-link']
    });

    const expectedValue = {
      slotId: mealSlot.id,
      recipeId: recipeIds[0]
    };

    wrapper.findAll('.recipe-list-remove-button').wrappers[0].trigger('click');

    expect(mockStore.commit).toHaveBeenCalledWith('schedule/removeRecipeFromMealSlot', expectedValue);
  });
});
