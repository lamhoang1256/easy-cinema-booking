import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { modalTrailer } from "./reducers/modalTrailer.reducer";
import { movieList } from "./reducers/movieList.reducer";
import { movieDetail } from "./reducers/movieDetail.reducer";
import { movieComment } from "./reducers/movieComment.reducer";

const rootReducer = combineReducers({ modalTrailer, movieList, movieDetail, movieComment });
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
