import firebase from 'firebase'

export const USER_COURSE_BEGIN = 'USER_COURSE_BEGIN';
export const USER_COURSE_SUCCESS = 'USER_COURSE_SUCCESS';
export const USER_COURSE_ERROR = 'USER_COURSE_ERROR';

export const USER_BEGIN = 'USER_BEGIN'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_ERROR = 'USER_ERROR'


export const fethBegin = () =>({
    type: USER_COURSE_BEGIN
})
export const fetchSuccess = (course)=>({
    type: USER_COURSE_SUCCESS,
    payload: {course}
})
export const fetchError = (error)=>({
    type: USER_COURSE_ERROR,
    payload: {error}
})

export function fetchUserCourse(){
    return dispatch=>{
        dispatch(fethBegin())
        return firebase.firestore().collection('courses').get()
                .then((snapshot)=>{
                    let array = []
                    snapshot.forEach((doc)=>{
                        console.log(doc.id);
                        doc.data().users.forEach((item)=>{
                            
                            
                            //console.log(firebase.auth().currentUser.uid)
                            //console.log(item.id)
                            if (firebase.auth().currentUser.uid===item.id)
                            {
                                array.push(doc.data())
                            }
                            //console.log(array);
                            
                        })
                    })
                    dispatch(fetchSuccess(array))
                }).catch(error=>{
                    console.log(error.message);
                    dispatch(fetchError(error.message))
                })
    }
}

export const userBegin = ()=>({
    type: USER_BEGIN
})
export const userSuccess= (user)=>({
    type: USER_SUCCESS,
    user
})
export const userError = (error)=>({
    type: USER_ERROR,
    error
})

export function user(){
    return dispatch=>{
        dispatch(userBegin())
        return firebase.firestore().collection('users').get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                doc.id === firebase.auth().currentUser.uid&&
                dispatch(userSuccess(doc.data()))                
            })
        }).catch((error)=>dispatch(userError(error.message)))
    }
}