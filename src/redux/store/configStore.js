import thunk from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { modalTrailer } from "../reducers/modalTrailer.reducer";
import { movieDetail } from "../reducers/movieDetail.reducer";
import { movieBooking } from "../reducers/movieBuyTicket.reducer";
import { movieCinema } from "../reducers/movieCinema.reducer";
import { movieFilter } from "../reducers/movieFilter.reducer";
import { user } from "../reducers/user.reducer";

const rootReducer = combineReducers({
  modalTrailer,
  movieDetail,
  movieBooking,
  movieCinema,
  movieFilter,
  user,
});
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
