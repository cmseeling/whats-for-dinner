import { shallowMount, createLocalVue } from '@vue/test-utils';
import map from 'lodash/map';
import Vuetify from 'vuetify';
import DesktopLayout from '@/components/desktopScheduleLayout/DesktopLayout.vue';
import DesktopSlot from '@/components/desktopScheduleLayout/DesktopSlot.vue';
import { DefaultScheduleState } from '@/state/interfaces/ScheduleState';
import { MealSlot } from '@/models/MealSlot';
import { AugmentedSlot } from '@/models/AugmentedSlot';

const localVue = createLocalVue();
localVue.use(Vuetify);

let mealSlots: MealSlot[];
let slots: AugmentedSlot[];
let mockSetActive: jest.Mock;

describe('DesktopLayout.vue', () => {
  beforeEach(() => {
    mealSlots = DefaultScheduleState().mealSlots;
    slots = map(mealSlots, (slot: MealSlot) => {
      return {
        ...slot,
        selected: false
      };
    });

    mockSetActive = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders meal slots', () => {
    const wrapper = shallowMount(DesktopLayout, {
      propsData: {slots, setActive: mockSetActive},
      localVue
    });

    expect(wrapper.findAll(DesktopSlot).length).toBe(21);
  });
});
