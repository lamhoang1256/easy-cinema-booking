import thunk from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { modalTrailer } from "../reducers/movie/modalTrailer.reducer";
import { movieDetail } from "../reducers/movie/movieDetail.reducer";
import { TicketRoom } from "../reducers/movie/ticketRoom.reducer";
import { movieFilter } from "../reducers/movie/movieFilter.reducer";
import { user } from "../reducers/user/user.reducer";

const rootReducer = combineReducers({
  modalTrailer,
  movieDetail,
  TicketRoom,
  movieFilter,
  user,
});
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
