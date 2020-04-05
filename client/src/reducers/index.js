import userReducer from "./user";
import ticketsReducer from "./tickets";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    userReducer,
    ticketsReducer
});

export default allReducers;