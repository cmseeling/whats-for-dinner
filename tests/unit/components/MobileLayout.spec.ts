import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
import map from 'lodash/map';
import Vuetify from 'vuetify';
import MobileLayout from '@/components/mobileScheduleLayout/MobileLayout.vue';
import MobileSlot from '@/components/mobileScheduleLayout/MobileSlot.vue';
import { DefaultScheduleState } from '@/state/interfaces/ScheduleState';
import { MealSlot } from '@/models/MealSlot';
import { AugmentedSlot } from '@/models/AugmentedSlot';

const localVue = createLocalVue();
localVue.use(Vuetify);

let mealSlots: MealSlot[];
let slots: AugmentedSlot[];
let mockSetActive: jest.Mock;

describe('MobileLayout.vue', () => {
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
    const wrapper = shallowMount(MobileLayout, {
      propsData: {slots, setActive: mockSetActive},
      localVue,
      stubs: ['router-link']
    });

    expect(wrapper.findAll(MobileSlot).length).toBe(3);
  });

  it('goes forward a day', () => {
    const wrapper = mount(MobileLayout, {
      propsData: {slots, setActive: mockSetActive},
      localVue,
      stubs: ['router-link']
    });

    expect(wrapper.find('.mobile-day-label').text()).toBe('Sunday');
    wrapper.find('.next-button').trigger('click');
    expect(wrapper.find('.mobile-day-label').text()).toBe('Monday');
  });

  it('goes forward a day', () => {
    const wrapper = mount(MobileLayout, {
      propsData: {slots, setActive: mockSetActive},
      localVue,
      stubs: ['router-link']
    });

    expect(wrapper.find('.mobile-day-label').text()).toBe('Sunday');
    wrapper.find('.prev-button').trigger('click');
    expect(wrapper.find('.mobile-day-label').text()).toBe('Saturday');
  });
});
