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

// suppress warning about data-app attribute:
// https://forum.vuejs.org/t/vuetify-data-app-true-and-problems-rendering-v-dialog-in-unit-tests/27495/9
document.body.setAttribute('data-app', 'true');

let mockStore: any;
let mealSlots: MealSlot[];
let testPlan1: MealPlan;
let testPlan2: MealPlan;
let mockDispatch: jest.Mock;

const generateStore = (mealPlans: MealPlan[]) => {
  return {
    state: {
      schedule: {
        mealSlots
      }
    },
    getters: {
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
    dispatch: mockDispatch
  };
};

describe('MealSchedule.vue', () => {
  beforeEach(() => {
    mealSlots = DefaultScheduleState().mealSlots;

    testPlan1 = generateMealPlan(1, 'test plan 1');
    testPlan2 = generateMealPlan(2, 'test plan 2');

    mockDispatch = jest.fn();
    mockStore = generateStore([testPlan1, testPlan2]);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders', () => {
    const wrapper = mount(MealSchedule, {
      mocks: { $store: mockStore },
      stubs: ['router-link']
    });

    expect(wrapper.find('.schedule-title').text()).toBe('Meal Plan');
  });

  it('toggles name editing', () => {
    const wrapper = mount(MealSchedule, {
      mocks: { $store: mockStore },
      stubs: ['router-link']
    });

    expect(wrapper.find('.schedule-name').find('input').attributes('disabled')).toBe('disabled');
    wrapper.find('.toggle-schedule-name-button').trigger('click');
    expect(wrapper.find('.schedule-name').find('input').attributes('disabled')).toBe(undefined);
  });

  it('saves a meal plan', () => {
    const wrapper = mount(MealSchedule, {
      mocks: { $store: mockStore },
      stubs: ['router-link']
    });

    wrapper.find('.schedule-save-button').trigger('click');
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith('mealPlans/saveMealPlan', expect.anything());
  });

  it('sets error if trying to save more than 10 plans', () => {
    mockStore.getters['mealPlans/mealPlans'] = [0, 1, 2, 3, 4, 5, 7, 8, 9];

    const wrapper = mount(MealSchedule, {
      mocks: { $store: mockStore },
      stubs: ['router-link']
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

    // console.log(testPlan2);

    mockStore = generateStore([testPlan1, testPlan2]);

    const wrapper = mount(MealSchedule, {
      mocks: { $store: mockStore },
      stubs: ['router-link']
    });

    wrapper.find('.mealplan-select').find('input').setValue(2);
    wrapper.find('.mealplan-select').find('.v-list__tile__title').trigger('click');
    expect(mockDispatch).toHaveBeenCalledTimes(1);

    /*
     * TODO: change the second parameter for the expect to be the actual meal slots for testPlan2
     * The documentation for v-select does not show how to set the selected value using Jest/vue-test-utils
     * and calling wrapper.vm.setData() doesn't seem to update the value that the component's loadMealPlan depends on.
     */
    expect(mockDispatch).toHaveBeenCalledWith('schedule/setSchedule', expect.anything());
  });

  it('deletes a meal plan', () => {
    const wrapper = mount(MealSchedule, {
      mocks: { $store: mockStore },
      stubs: ['router-link']
    });

    wrapper.find('.schedule-delete-button').trigger('click');

    expect(wrapper.contains('.confirmation-dialog')).toBe(true);

    wrapper.find('.dialog-confirmation-button').trigger('click');

    expect(mockDispatch).toHaveBeenCalledWith('mealPlans/deleteMealPlan', -1);
  });
});
