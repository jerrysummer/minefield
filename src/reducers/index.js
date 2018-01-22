import { combineReducers } from "redux";
import Minefield from './reducer_minefield';
import Header from './reducer_header';

const rootReducer = combineReducers({
  minefield: Minefield,
  header: Header,
});

export default rootReducer;
