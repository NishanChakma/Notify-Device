import { combineReducers } from "redux";

//import all reducers here...
import HomeReducer from "./MyReducers";

const rootReducer = combineReducers({
  home: HomeReducer,
});

export default rootReducer;

export type RootrootReducer = ReturnType<typeof rootReducer>;
