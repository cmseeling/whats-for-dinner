import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import MealSchedule from '@/components/MealSchedule.vue';
import { DefaultScheduleState } from '@/state/interfaces/ScheduleState';
import { MealSlot } from '@/models/MealSlot';

const localVue = createLocalVue();
localVue.use(Vuetify);

let mockStore: any;
let mealSlots: MealSlot[];

describe('MealSchedule.vue', () => {
  beforeEach(() => {
    mealSlots = DefaultScheduleState().mealSlots;

    mockStore = {
      state: {
        schedule: {
          mealSlots
        }
      }
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders', () => {
    const wrapper = shallowMount(MealSchedule, {
      mocks: { $store: mockStore },
      localVue
    });

    expect(wrapper.find('.schedule-title').text()).toBe('Schedule');
  });
});
