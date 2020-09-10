import { combineReducers } from "redux";

import currentPage from "./currentPage/reducer";
import userData from "./userData/reducer";

const reducers = combineReducers({
  currentPage,
  userData,
});

export default reducers;
