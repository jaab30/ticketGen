import axios from "axios";
import { LOAD_TICKETS, LOAD_USER_TICKETS, POST_TICKET, UPDATE_TICKET, DELETE_TICKET, CLEAR_TICKETS } from "../actions/actions"
import { tokenConfig } from "./authAction";

export const loadAllTickets = () => dispatch => {

    axios.get("/api/tickets")
        .then(data => {
            dispatch({
                type: LOAD_TICKETS,
                payload: data
            })
        })
}

export const loadUserTickets = () => (dispatch, getState) => {
    console.log("Action");

    axios.get("/api/users/user", tokenConfig(getState))
        .then(data => {
            dispatch({
                type: LOAD_USER_TICKETS,
                payload: data.data.tickets
            })
        })
}

export const clearTickets = () => {
    return {
        type: CLEAR_TICKETS
    }
}

