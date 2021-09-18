import React from "react";
import { Provider } from "react-redux";
import { store, persistor } from "./State/store";
import Router from "./Router";
import { PersistGate } from "redux-persist/integration/react";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  );
};

export default App;
