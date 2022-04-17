import thunk from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { modalTrailer } from "../reducers/modalTrailer.reducer";
import { movieList } from "../reducers/movieList.reducer";
import { movieDetail } from "../reducers/movieDetail.reducer";
import { movieBooking } from "../reducers/movieBuyTicket.reducer";
import { movieCinema } from "../reducers/movieCinema.reducer";
import { movieSearch } from "../reducers/movieSearch.reducer";
import { user } from "../reducers/user.reducer";

const rootReducer = combineReducers({
  modalTrailer,
  movieList,
  movieDetail,
  movieBooking,
  movieCinema,
  movieSearch,
  user,
});
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
