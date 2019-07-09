export interface AppState {
  hasError: boolean;
  errorMessage: string;
}

export const DefaultAppState = (): AppState => {
  return {
    hasError: false,
    errorMessage: ''
  };
};
