import identity from '@/state/modules/identity';
import { DefaultIdentityState, IdentityState } from '@/state/interfaces/Identity';
import { generateUser } from '../../helpers/user';

let state: IdentityState;

describe('identity.ts', () => {
  beforeEach(() => {
    state = DefaultIdentityState();
  });

  it('returns false if user is not logged in', () => {
    expect(identity.getters.isLoggedIn(state)).toBe(false);
  });

  it('returns true if user is logged in', () => {
    state.user = generateUser();
    expect(identity.getters.isLoggedIn(state)).toBe(true);
  });

  it('gets the user\'s id', () => {
    const id = 'testUsderId';
    state.user = generateUser({id});
    expect(identity.getters.userId(state)).toBe(id);
  });

  it('gets the user\'s email address', () => {
    const emailAddress = 'testemail@test.com';
    state.user = generateUser({email: emailAddress});
    expect(identity.getters.userEmail(state)).toBe(emailAddress);
  });

  it('gets the user\'s full name', () => {
    const fullName = 'test full name';
    state.user = generateUser({fullName});
    expect(identity.getters.userName(state)).toBe(fullName);
  });

  it('sets the user', () => {
    const user = generateUser();
    const expectedState = {user} as IdentityState;
    identity.mutations.setUser(state, user);
    expect(state).toEqual(expectedState);
  });
});

