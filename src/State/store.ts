import { createStore, applyMiddleware, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import reducers from "./Reducers/RootReducer";
import SagaActions from "./SagaActions";
import { persistStore, persistReducer, createTransform } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { State } from "./Reducers/MyReducers";

const sagaMiddleWare = createSagaMiddleware();

const passengerBlacklist = createTransform(
  null,
  (state: State) => {
    const newState = state;
    newState.error = "";
    newState.successMessage = "";
    return newState;
  },
  { whitelist: ["home"] }
);

const persistConfig = {
  key: "root",
  storage: storage,
  transforms: [passengerBlacklist],
};

const persistedReducer = persistReducer(persistConfig, reducers);

let store: Store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleWare))
);

let persistor = persistStore(store);

sagaMiddleWare.run(SagaActions);

export { store, persistor };
