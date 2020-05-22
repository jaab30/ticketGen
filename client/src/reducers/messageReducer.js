import {
    LOAD_MESSAGES,
    POST_MESSAGES,
    POST_MESSAGE_SUCCESS,
    UPDATE_MESSAGE
} from "../actions/actions";

const initialState = {
    messages: [],
    isPostMessageSuccess: false
}

export default function (state = initialState, actions) {

    switch (actions.type) {
        case LOAD_MESSAGES:
            return {
                ...state,
                messages: actions.payload
            }
        case POST_MESSAGES:
            return {
                ...state,
                isPostMessageSuccess: true
            }
        case UPDATE_MESSAGE:
            const currentIndex = state.messages.findIndex(x => x._id === actions.payload._id)
            state.messages.splice(currentIndex, 1, actions.payload)
            return {
                ...state
            }
        case POST_MESSAGE_SUCCESS:
            return {
                ...state,
                isPostMessageSuccess: false
            }
        case LOAD_MESSAGES:
            return {
                messages: actions.payload
            }
        default:
            return state
    }
}