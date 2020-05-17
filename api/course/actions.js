import firebase from 'firebase'

export const FETCH_COURSE_BEGIN = 'FETCH_COURSE_BEGIN';
export const FETCH_COURSE_SUCCESS = 'FETCH_COURSE_SUCCESS';
export const FETCH_COURSE_ERROR = 'FETCH_COURSE_ERROR';

export const SEARCH_COURSE = 'SEARCH_COURSE' 
export const SEARCH_COURSE_SUCCESS= 'SEARCH_COURSE_SUCCESS'
export const SEARCH_COURSE_ERROR = 'SEARCH_COURSE_ERROR'

export const fethBegin = () =>({
    type: FETCH_COURSE_BEGIN
})
export const fetchSuccess = (course)=>({
    type: FETCH_COURSE_SUCCESS,
    payload: {course}
})
export const fetchError = (error)=>({
    type: FETCH_COURSE_ERROR,
    payload: {error}
})

export const search =(text) =>({
    type: SEARCH_COURSE,
    text
})
/*export const searchSuccess = (data)=>({
    type: SEARCH_COURSE_SUCCESS,
    payload: {data}
})
export const searchError = (error)=>({
    type: SEARCH_COURSE_ERROR,
    payload: {error}
})*/

export function fetchCourse(){
    return dispatch=>{
        dispatch(fethBegin())
        return firebase.firestore().collection('courses').get()
                .then((snapshot)=>{
                    let array = []
                    //console.log(snapshot)

                    snapshot.forEach((doc)=>{
                        //console.log(`${doc.title}`)
                        array.push(doc.data())
                        //console.log(array)
                    })
                    console.log('/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/');
                    //console.log(array);
                    dispatch(fetchSuccess(array))
                }).catch(error=>{
                    console.log(error.message);
                    dispatch(fetchError(error.message))
                })
    }
}

export function searchCourse(text){
    return dispatch=>{
        dispatch(search(text))
    }
}

