import thunk from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { modalTrailer } from "../reducer/modalTrailer.reducer";
import { movieDetail } from "../reducer/movieDetail.reducer";
import { TicketRoom } from "../reducer/ticketRoom.reducer";
import { movieFilter } from "../reducer/movieFilter.reducer";
import { user } from "../reducer/user.reducer";

const rootReducer = combineReducers({
  modalTrailer,
  movieDetail,
  TicketRoom,
  movieFilter,
  user,
});
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
