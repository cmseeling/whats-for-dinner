import { mount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import MealSchedule from '@/components/MealSchedule.vue';
import { DefaultScheduleState, CreateEmptySchedule } from '@/state/interfaces/ScheduleState';
import { MealSlot } from '@/models/MealSlot';
import { MealPlan } from '@/models/MealPlan';
import { generateMealPlan } from '../../helpers/mealPlan';

// this should really be localVue but Vuetify pollutes the Vue prototype and causes the tests to throw bad exceptions.
// See https://github.com/vuetifyjs/vuetify/issues/4861 and https://github.com/vuetifyjs/vuetify/issues/6046
Vue.use(Vuetify);

let vuetify: any;

// suppress warning about data-app attribute:
// https://forum.vuejs.org/t/vuetify-data-app-true-and-problems-rendering-v-dialog-in-unit-tests/27495/9
document.body.setAttribute('data-app', 'true');

let mockStore: any;
let mealSlots: MealSlot[];
let testPlan1: MealPlan;
let testPlan2: MealPlan;
let mockDispatch: jest.Mock;
let mockCommit: jest.Mock;

const generateStore = (mealPlans: MealPlan[]) => {
  return {
    state: {
      schedule: {
        mealSlots
      }
    },
    getters: {
      'mealPlans/selectedPlanId': -1,
      'mealPlans/mealPlans': mealPlans,
      'mealPlans/getMealPlanById': (id: number) => {
        if (id === 1) {
          return testPlan1;
        } else if (id === 2) {
          return testPlan2;
        } else {
          return null;
        }
      }
    },
    dispatch: mockDispatch,
    commit: mockCommit
  };
};

describe('MealSchedule.vue', () => {
  beforeEach(() => {
    vuetify = new Vuetify();

    mealSlots = DefaultScheduleState().mealSlots;

    testPlan1 = generateMealPlan(1, 'test plan 1');
    testPlan2 = generateMealPlan(2, 'test plan 2');

    mockDispatch = jest.fn();
    mockStore = generateStore([testPlan1, testPlan2]);
    mockCommit = jest.fn().mockImplementation((action: string, value: any) => {
      if (action === 'mealPlans/setSelectedPlanId') {
        mockStore.getters['mealPlans/selectedPlanId'] = value;
      }
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders', () => {
    const wrapper = mount(MealSchedule, {
      mocks: { $store: mockStore },
      stubs: ['router-link'],
      vuetify
    });

    expect(wrapper.find('.schedule-title').text()).toBe('Meal Plan');
  });

  it('toggles name editing', () => {
    const wrapper = mount(MealSchedule, {
      mocks: { $store: mockStore },
      stubs: ['router-link'],
      vuetify
    });

    expect(wrapper.find('.schedule-name').find('input').attributes('disabled')).toBe('disabled');
    wrapper.find('.toggle-schedule-name-button').trigger('click');
    expect(wrapper.find('.schedule-name').find('input').attributes('disabled')).toBe(undefined);
  });

  it('saves a meal plan', () => {
    const wrapper = mount(MealSchedule, {
      mocks: { $store: mockStore },
      stubs: ['router-link'],
      vuetify
    });

    wrapper.find('.schedule-save-button').trigger('click');
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith('mealPlans/saveMealPlan', expect.anything());
  });

  it('sets error if trying to save more than 10 plans', () => {
    mockStore.getters['mealPlans/mealPlans'] = [0, 1, 2, 3, 4, 5, 7, 8, 9];

    const wrapper = mount(MealSchedule, {
      mocks: { $store: mockStore },
      stubs: ['router-link'],
      vuetify
    });

    wrapper.find('.schedule-save-button').trigger('click');
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(
      'app/setNewErrorMessage',
      'You must delete a plan before you can create a new one!');
  });

  it('loads a plan', () => {
    const slots = CreateEmptySchedule();
    slots[2].recipeIds = [1];
    testPlan2.slots = slots;

    mockStore = generateStore([testPlan1, testPlan2]);

    const wrapper = mount(MealSchedule, {
      mocks: { $store: mockStore },
      stubs: ['router-link'],
      vuetify
    });

    wrapper.find('.v-select__selection').trigger('click');
    wrapper.find('.v-menu__content').findAll('.v-list-item__content').wrappers[2].trigger('click');
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith('schedule/setSchedule', slots);
  });

  it('deletes a meal plan', () => {
    mockStore.getters['mealPlans/selectedPlanId'] = 2;
    const wrapper = mount(MealSchedule, {
      mocks: { $store: mockStore },
      stubs: ['router-link'],
      vuetify
    });

    wrapper.find('.schedule-delete-button').trigger('click');

    expect(wrapper.contains('.v-dialog--active')).toBe(true);

    wrapper.find('.dialog-confirmation-button').trigger('click');

    expect(mockDispatch).toHaveBeenCalledWith('mealPlans/deleteMealPlan', 2);
  });
});
