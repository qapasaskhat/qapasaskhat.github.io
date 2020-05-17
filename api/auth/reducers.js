import {
    AUTH_LOGIN_ERROR,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_BEGIN
} from './actions'

const initianState = {
    items: {},
    loading: false,
    error: null
}

export default function authReducer(state = initianState,action){
    switch(action.type){
        case AUTH_LOGIN_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }
        case AUTH_LOGIN_SUCCESS:
            return{
                ...state,
                loading: false,
                items: action.payload.login
            }
        case AUTH_LOGIN_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload.error,
                items:{}
            }
        default:
            return state
    }
}