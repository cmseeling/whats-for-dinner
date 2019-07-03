import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
import map from 'lodash/map';
import Vuetify from 'vuetify';
import MobileLayout from '@/components/mobileScheduleLayout/MobileLayout.vue';
import MobileSlot from '@/components/mobileScheduleLayout/MobileSlot.vue';
import { DefaultScheduleState, AugmentedSlot, IMealSlot } from '@/state/interfaces/ScheduleState';

const localVue = createLocalVue();
localVue.use(Vuetify);

let mealSlots: IMealSlot[];
let slots: AugmentedSlot[];
let mockSetActive: jest.Mock;

describe('MobileLayout.vue', () => {
  beforeEach(() => {
    mealSlots = DefaultScheduleState().mealSlots;
    slots = map(mealSlots, (slot: IMealSlot) => {
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
      localVue
    });

    expect(wrapper.findAll(MobileSlot).length).toBe(3);
  });

  it('goes forward a day', () => {
    const wrapper = mount(MobileLayout, {
      propsData: {slots, setActive: mockSetActive},
      localVue
    });

    expect(wrapper.find('.mobile-day-label').text()).toBe('Sunday');
    wrapper.find('.next-button').trigger('click');
    expect(wrapper.find('.mobile-day-label').text()).toBe('Monday');
  });

  it('goes forward a day', () => {
    const wrapper = mount(MobileLayout, {
      propsData: {slots, setActive: mockSetActive},
      localVue
    });

    expect(wrapper.find('.mobile-day-label').text()).toBe('Sunday');
    wrapper.find('.prev-button').trigger('click');
    expect(wrapper.find('.mobile-day-label').text()).toBe('Saturday');
  });
});
