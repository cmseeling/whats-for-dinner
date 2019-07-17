import ConfirmDeleteDialog from '@/components/ConfirmDeleteDialog.vue';
import { mount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';

// this should really be localVue but Vuetify pollutes the Vue prototype and causes the tests to throw bad exceptions.
// See https://github.com/vuetifyjs/vuetify/issues/4861 and https://github.com/vuetifyjs/vuetify/issues/6046
Vue.use(Vuetify);
// suppress warning about data-app attribute:
// https://forum.vuejs.org/t/vuetify-data-app-true-and-problems-rendering-v-dialog-in-unit-tests/27495/9
document.body.setAttribute('data-app', 'true');

describe('ConfirmDeleteDialog.vue', () => {
  it('renders', () => {
    const wrapper = mount(ConfirmDeleteDialog, {
      propsData: { isOpen: true }
    });

    expect(wrapper.find('.headline').text()).toBe('Are you sure you want to delete this item?');
  });

  it('emits success', () => {
    const wrapper = mount(ConfirmDeleteDialog, {
      propsData: { isOpen: true }
    });

    wrapper.find('.dialog-confirmation-button').trigger('click');

    expect(wrapper.emitted()).toEqual({'dialog:confirm': [[]]});
  });

  it('emits cancel', () => {
    const wrapper = mount(ConfirmDeleteDialog, {
      propsData: { isOpen: true }
    });

    wrapper.find('.dialog-cancel-button').trigger('click');

    expect(wrapper.emitted()).toEqual({'dialog:cancel': [[]]});
  });
});
