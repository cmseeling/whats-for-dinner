import { shallowMount, createLocalVue } from '@vue/test-utils';
import Router from 'vue-router';
import Vuetify from 'vuetify';
import Layout from '@/components/Layout.vue';
import { DefaultIdentityState, IdentityState } from '@/state/interfaces/Identity';
import identity from '@/state/modules/identity';
import { generateUser } from '../../helpers/user';

const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(Router);

let mockStore: any;
let identityState: IdentityState;

const createMockStore = (hasError = false, errorMessage = '') => {
  return {
    commit: jest.fn(),
    getters: {
      'identity/isLoggedIn': identity.getters.isLoggedIn(identityState),
      'identity/userName': identity.getters.userName(identityState),
      'app/hasError': hasError,
      'app/errorMessage': errorMessage
    }
  };
};

describe('Layout.vue', () => {
  beforeEach(() => {
    identityState = DefaultIdentityState();

    mockStore = createMockStore();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders', () => {
    const wrapper = shallowMount(Layout, {
      mocks: { $store: mockStore },
      localVue
    });

    expect(wrapper.find('.white-text').text()).toBe('What\'s For Dinner?');
  });

  it('shows login and signup buttons', () => {
    const wrapper = shallowMount(Layout, {
      mocks: { $store: mockStore },
      localVue
    });

    expect(wrapper.contains('.login-button')).toBe(true);
    expect(wrapper.contains('.signup-button')).toBe(true);
  });

  it('shows name and logout buttons', () => {
    identityState.user = generateUser();
    mockStore = createMockStore();

    const wrapper = shallowMount(Layout, {
      mocks: { $store: mockStore },
      localVue
    });

    expect(wrapper.contains('.wfd-user-name')).toBe(true);
    expect(wrapper.contains('.logout-button')).toBe(true);
  });

  it('shows error message', () => {
    const message = 'test message';
    mockStore = createMockStore(true, message);

    const wrapper = shallowMount(Layout, {
      mocks: { $store: mockStore },
      localVue
    });

    expect(wrapper.contains('.application-error-message')).toBe(true);
    expect(wrapper.find('.application-error-message').text()).toBe(message);
  });
});
