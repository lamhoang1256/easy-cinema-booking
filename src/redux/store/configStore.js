import thunk from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { modalTrailer } from "redux/reducers/modalTrailer.reducer";
import { movieDetail } from "redux/reducers/movieDetail.reducer";
import { TicketRoom } from "redux/reducers/ticketRoom.reducer";
import { movieFilter } from "redux/reducers/movieFilter.reducer";
import { user } from "redux/reducers/user.reducer";

const rootReducer = combineReducers({
  modalTrailer,
  movieDetail,
  TicketRoom,
  movieFilter,
  user,
});
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
