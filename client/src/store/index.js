import { createStore, applyMiddleware } from "redux";
import allReducers from "../reducers";
import thunk from "redux-thunk";


// const store = createStore(allReducers, applyMiddleware(thunk));
const store = createStore(allReducers, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (a) => a));

export default store;