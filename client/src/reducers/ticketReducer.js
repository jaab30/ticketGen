import { LOAD_TICKETS, LOAD_USER_TICKETS, POST_TICKET, UPDATE_TICKET, DELETE_TICKET, CLEAR_TICKETS } from "../actions/actions"

const initialState = {
    allTickets: [],
    userTickets: []
}

export default function (state = initialState, action) {

    switch (action.type) {
        case LOAD_TICKETS:
            return {
                ...state,
                allTickets: action.payload
            }
        case LOAD_USER_TICKETS:
            return {
                ...state,
                userTickets: action.payload
            }
        case POST_TICKET:
            return
        case UPDATE_TICKET:
            return
        case DELETE_TICKET:
            return
        case CLEAR_TICKETS:
            return {
                allTickets: [],
                userTickets: []
            }
        default:
            return state;








    }




}