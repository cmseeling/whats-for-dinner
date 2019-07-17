import identity from '@/state/modules/identity';
import { DefaultIdentityState, IdentityState } from '@/state/interfaces/Identity';
import { generateUser } from '../../helpers/user';

let state: IdentityState;
let commit: jest.Mock;
let dispatch: jest.Mock;

describe('identity.ts', () => {
  beforeEach(() => {
    commit = jest.fn();
    dispatch = jest.fn();
    state = DefaultIdentityState();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('returns false if user is not logged in', () => {
    expect(identity.getters.isLoggedIn(state)).toBe(false);
  });

  it('returns true if user is logged in', () => {
    state.user = generateUser();
    expect(identity.getters.isLoggedIn(state)).toBe(true);
  });

  it('gets the user object', () => {
    const id = 'testUserId';
    const expectedUser = generateUser({id});
    state.user = expectedUser;
    expect(identity.getters.user(state)).toBe(expectedUser);
  });

  it('gets the user\'s id', () => {
    const id = 'testUserId';
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

  it('updates the user', () => {
    const user = generateUser();
    identity.actions.updateUser({commit, dispatch}, user);

    expect(commit).toHaveBeenCalledTimes(1);
    expect(commit).toHaveBeenCalledWith('setUser', user);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith('loadUserData');
  });

  it('clears the user', () => {
    identity.actions.updateUser({commit, dispatch}, null);

    expect(commit).toHaveBeenCalledTimes(1);
    expect(commit).toHaveBeenCalledWith('setUser', null);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, 'recipes/clearRecipes', null, {root: true});
    expect(dispatch).toHaveBeenNthCalledWith(2, 'mealPlans/clearMealPlans', null, {root: true});
  });
});

