import { createStore, applyMiddleware, compose } from "redux";
import allReducers from "../reducers";
import thunk from "redux-thunk";


const store = createStore(allReducers, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;