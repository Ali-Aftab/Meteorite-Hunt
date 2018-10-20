import { createStore, applyMiddleware } from "redux";
import createLogger from "redux-logger";
import thunkMiddleware from "redux-thunk";

export const GET_METEORITES = "GET_METEORITES";
export const TOP_FIVE = "TOP_FIVE";

let initialState = {
  allMeteorites: [],
  topFive: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_METEORITES:
      return { ...state, allMeteorites: action.payload };
    case TOP_FIVE: {
      return { ...state, topFive: action.payload };
    }
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, createLogger)
);

export default store;
