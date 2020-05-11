import userReducer from "./user";
import ticketReducer from "./ticketReducer";
import authReducer from "./authReducer";
import messageReducer from "./messageReducer";
import errorReducer from "./errorReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    userReducer,
    ticketReducer,
    messageReducer,
    authReducer,
    errorReducer
});

export default allReducers;