import {createStore, combineReducers} from "redux";
import list from "./reducer/list";
import topic from "./reducer/topic";
export default createStore(combineReducers({
    list,
    topic
}));