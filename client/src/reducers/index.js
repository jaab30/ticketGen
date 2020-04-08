import userReducer from "./user";
import ticketReducer from "./ticketReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    userReducer,
    ticketReducer,
    authReducer,
    errorReducer
});

export default allReducers;