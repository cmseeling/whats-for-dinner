import app from '@/state/modules/app';
import { AppState, DefaultAppState } from '@/state/interfaces/App';

let state: AppState;
let commit: jest.Mock;
let dispatch: jest.Mock;

describe('app.ts', () => {
  beforeEach(() => {
    state = DefaultAppState();
    commit = jest.fn();
    dispatch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('returns false if an error does not exists', () => {
    expect(app.getters.hasError(state)).toBe(false);
  });

  it('returns true if an error exists', () => {
    state.hasError = true;
    expect(app.getters.hasError(state)).toBe(true);
  });

  it('gets an error message', () => {
    const expectedMessage = 'test message';
    state.errorMessage = expectedMessage;
    expect(app.getters.errorMessage(state)).toBe(expectedMessage);
  });

  it('sets an error message', () => {
    const expectedMessage = 'test message';
    app.actions.setNewErrorMessage({commit, dispatch}, expectedMessage);

    expect(commit).toHaveBeenCalledTimes(2);
    expect(commit).toHaveBeenNthCalledWith(1, 'setHasError', true);
    expect(commit).toHaveBeenNthCalledWith(2, 'setErrorMessage', expectedMessage);
  });

  it('dismisses an error message', () => {
    app.actions.dismissErrorMessage({commit});

    expect(commit).toHaveBeenCalledTimes(2);
    expect(commit).toHaveBeenNthCalledWith(1, 'setHasError', false);
    expect(commit).toHaveBeenNthCalledWith(2, 'setErrorMessage', '');
  });
});
