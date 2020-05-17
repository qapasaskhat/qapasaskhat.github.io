import {
    FETCH_COURSE_BEGIN,
    FETCH_COURSE_ERROR,
    FETCH_COURSE_SUCCESS,
    SEARCH_COURSE,

} from './actions'

const initianState = {
    items: [],
    loading: false,
    error: null,
    data: [],
}

export default function courseReducer(state = initianState,action){
    switch(action.type){
        case FETCH_COURSE_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FETCH_COURSE_SUCCESS:
            return{
                ...state,
                loading: false,
                items: action.payload.course
            }
        case FETCH_COURSE_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload.error,
                items:{}
            }
        case SEARCH_COURSE:
            return{
                ...state,
                data: state.items.filter(i=>{
                    const itemData = `${i.title.toUpperCase()}`
                    const textData = action.text.toUpperCase()
                    return itemData.indexOf(textData) > -1
                })
            }
        default:
            return state
    }
}