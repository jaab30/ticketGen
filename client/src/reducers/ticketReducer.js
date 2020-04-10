import { LOAD_TICKETS, LOAD_USER_TICKETS, POST_TICKET, UPDATE_TICKET, DELETE_TICKET, CLEAR_TICKETS, POST_SUCCESS } from "../actions/actions"

const initialState = {
    allTickets: [],
    userTickets: [],
    isPostSuccess: false
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
            return {
                ...state,
                isPostSuccess: true
            }
        case UPDATE_TICKET:
            return
        case DELETE_TICKET:
            return
        case POST_SUCCESS:
            return {
                ...state,
                isPostSuccess: false
            }
        case CLEAR_TICKETS:
            return {
                allTickets: [],
                userTickets: [],
                isPostSuccess: false
            }
        default:
            return state;








    }




}