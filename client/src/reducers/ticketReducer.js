import {
    LOAD_TICKETS,
    LOAD_USER_TICKETS,
    POST_TICKET,
    CLEAR_TICKETS,
    POST_SUCCESS,
    CURRENT_TICKET,
    POST_COMMENT,
    POST_IMAGE,
    IS_LOADING,
    POST_SINGLE_IMAGE,
    CLEAR_SINGLE_IMAGE,
    DELETE_NEW_TIX_IMAGE
} from "../actions/actions"

const initialState = {
    allTickets: [],
    userTickets: [],
    currentTicket: {},
    currentImage: [],
    isPostSuccess: false,
    isLoading: true
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
            return {
                ...state,
                currentTicket: chosen[0],
                isLoading: false
            }
        case POST_COMMENT:
            return {
                ...state,
                currentTicket: action.payload,
                isPostSuccess: true
            }
        case POST_IMAGE:
            return {
                ...state,
                currentTicket: action.payload,
                isPostSuccess: true,
                isLoading: false
            }
        case POST_SINGLE_IMAGE:
            return {
                ...state,
                currentImage: state.currentImage.concat(action.payload),
                isLoading: false
            }
        case DELETE_NEW_TIX_IMAGE:
            return {
                ...state,
                currentImage: state.currentImage.filter(item => item !== action.payload),
                isLoading: false
            }
        case CLEAR_SINGLE_IMAGE:
            return {
                ...state,
                currentImage: []
            }
        case IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
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