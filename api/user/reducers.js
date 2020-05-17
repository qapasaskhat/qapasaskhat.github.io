import {
    USER_COURSE_BEGIN,
    USER_COURSE_ERROR,
    USER_COURSE_SUCCESS,
    USER_BEGIN,
    USER_SUCCESS,
    USER_ERROR,
    
} from './actions'

const initianState = {
    items: [],
    loading: false,
    error: null,
    userLoad: false,
    userError: null,
    user: {}
}

export default function userCourseReducer(state = initianState,action){
    switch(action.type){
        case USER_COURSE_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }
        case USER_COURSE_SUCCESS:
            return{
                ...state,
                loading: false,
                items: action.payload.course
            }
        case USER_COURSE_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload.error,
                items:{}
            }
        case USER_BEGIN:
            return{
                ...state,
                userLoad: true,
                userError: null
            }
        case USER_SUCCESS:
            return{
                ...state,
                userLoad:false,
                user: action.user
            }
        case USER_ERROR:
            return{
                ...state,
                userLoad: false,
                error: action.error,
                user: {}
            }
        default:
            return state
    }
}