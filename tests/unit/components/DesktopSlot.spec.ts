import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';
import Vuetify from 'vuetify';
import DesktopSlot from '@/components/desktopScheduleLayout/DesktopSlot.vue';
import { Recipe } from '@/models/recipe';
import { IMealSlot } from '@/state/interfaces/ScheduleState';
import { generateRecipe } from '../../helpers/recipe';
import { getMockStore, getMockModule } from '../../helpers/vuex/storeMocker';
import RecipeMocks from '../../helpers/vuex/recipeModuleMocker';
import ScheduleMocks from '../../helpers/vuex/scheduleModuleMocker';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);

let store: Store<any>;
let mealSlot: IMealSlot;
let setActive: jest.Mock;
let recipeIds: number[];
let mockRecipe1: Recipe;
let mockRecipe2: Recipe;

describe('MealSlot.vue', () => {
  beforeEach(() => {
    setActive = jest.fn();
    recipeIds = [1, 2];

    mockRecipe1 = generateRecipe(1, 'test recipe', ['ingredient 1']);
    mockRecipe2 = generateRecipe(2, 'test recipe', ['ingredient 1']);

    const storeMock = getMockStore([
      getMockModule('recipes', RecipeMocks.getMockGetters([mockRecipe1, mockRecipe2], true), null, null),
      getMockModule('schedule', null, ScheduleMocks.getMockMutations(), null)
    ]);
    store = new Vuex.Store(storeMock);
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
      store,
      localVue
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
      store,
      localVue
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
      store,
      localVue
    });

    expect(wrapper.find('.collapsed-display').isVisible()).toBe(false);
    expect(wrapper.find('.meal-slot').isVisible()).toBe(true);
    expect(wrapper.contains('.empty-slot')).toBe(false);
    expect(wrapper.find('.recipe-list').isVisible()).toBe(true);
    expect(wrapper.findAll('.recipe-list-name').length).toBe(2);
    expect(wrapper.findAll('.recipe-list-name').wrappers[0].text()).toMatch(mockRecipe1.name);
    expect(wrapper.findAll('.recipe-list-name').wrappers[1].text()).toMatch(mockRecipe2.name);
  });
});
