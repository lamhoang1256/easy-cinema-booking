import thunk from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { modalTrailer } from "../reducers/modalTrailer.reducer";
import { movieList } from "../reducers/movieList.reducer";
import { movieDetail } from "../reducers/movieDetail.reducer";
import { movieComment } from "../reducers/movieComment.reducer";
import { movieBooking } from "../reducers/movieBuyTicket.reducer";
import { login } from "../reducers/login.reducer";

const rootReducer = combineReducers({
  modalTrailer,
  movieList,
  movieDetail,
  movieComment,
  movieBooking,
  login,
});
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
