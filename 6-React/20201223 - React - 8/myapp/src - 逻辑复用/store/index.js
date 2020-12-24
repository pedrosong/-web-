import {combineReducers, createStore} from "redux";
import topics from "./reducer/topics"; 
import guards from "./reducer/guards";
export default createStore(combineReducers({
    topics,
    guards
}));