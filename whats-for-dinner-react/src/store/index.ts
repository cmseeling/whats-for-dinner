import { configureStore, getDefaultMiddleware } from 'redux-starter-kit'
import recipeReducer from './recipes/reducer';

const rootReducer = {
  recipeReducer
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
