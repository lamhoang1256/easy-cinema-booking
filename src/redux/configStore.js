import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { modalTrailer } from "./reducers/modalTrailer.reducer";

const rootReducer = combineReducers({ modalTrailer });
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
