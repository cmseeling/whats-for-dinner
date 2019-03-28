import { configureStore, getDefaultMiddleware } from 'redux-starter-kit'
import RecipesSlice from './recipes/reducer';
import ScheduleSlice from './schedule/reducer';

const rootReducer = {
  RecipesSlice,
  ScheduleSlice
};

export default function configureAppStore(preloadedState: any) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware()],
    preloadedState
  })

  // if (process.env.NODE_ENV !== 'production' && module.hot) {
  //   module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
  // }

  return store
};
