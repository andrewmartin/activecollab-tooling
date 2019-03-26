import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import { createRouterMiddleware } from 'connected-next-router';

import ApiService from 'api/service';

import localForage from 'localforage';

import rootReducer from './reducers';

export default function configureStore(initialState = {}, options) {
  const persistedReducer = persistReducer(
    {
      storage: localForage,
      key: 'primary',
      whitelist: ['user'],
    },
    rootReducer
  );
  const reducer = options.isServer ? rootReducer : persistedReducer;

  const routerMiddleware = createRouterMiddleware();

  return createStore(
    reducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(routerMiddleware, thunk.withExtraArgument({ apiService: ApiService }))
    )
  );
}
