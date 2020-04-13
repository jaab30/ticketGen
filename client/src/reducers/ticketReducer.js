import { LOAD_TICKETS, LOAD_USER_TICKETS, POST_TICKET, UPDATE_TICKET, DELETE_TICKET, CLEAR_TICKETS, POST_SUCCESS, CURRENT_TICKET, POST_COMMENT } from "../actions/actions"

const initialState = {
    allTickets: [],
    userTickets: [],
    currentTicket: {},
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
        case CURRENT_TICKET:
            state.currentTicket = {};
            const chosen = state.userTickets.filter(ticket => ticket._id === action.payload);
            console.log(chosen);

            return {
                ...state,
                currentTicket: chosen[0]
            }
        case POST_COMMENT:
            return {
                ...state,
                currentTicket: action.payload,
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
                currentTicket: {},
                isPostSuccess: false
            }
        default:
            return state;








    }




}