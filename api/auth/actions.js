import firebase from 'firebase'

export const AUTH_LOGIN_BEGIN = 'AUTH_LOGIN_BEGIN';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_ERROR = 'AUTH_LOGIN_ERROR';

export const authLoginBegin = () =>({
    type: AUTH_LOGIN_BEGIN
})
export const authLoginSuccess = (login)=>({
    type: AUTH_LOGIN_SUCCESS,
    payload: {login}
})
export const authLoginError = (error)=>({
    type: AUTH_LOGIN_ERROR,
    payload: {error}
})

export function authLogin(user){
    return dispatch=>{
        dispatch(authLoginBegin())
        return firebase.auth().signInWithEmailAndPassword(user.email,user.password).
        then(res => {
            console.log(res)
            dispatch(authLoginSuccess(res))
        }).
        catch(error => {
            console.log(error.message);
            dispatch(authLoginError(error.message))
        }
            
            )
    }
}