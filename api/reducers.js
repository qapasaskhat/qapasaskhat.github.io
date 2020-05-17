import { combineReducers } from 'redux'
import authReducer from './auth/reducers'
import courseReducer from './course/reducers'
import userCourseReducer from './user/reducers'
const rootReducers= combineReducers({
    authReducer,
    courseReducer,
    userCourseReducer
})

export default rootReducers