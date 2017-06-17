import { Firebase, FirebaseRef } from '../firebase';

export function login(user) {
  return (dispatch) => {
    return Firebase.auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        return dispatch({
          type: 'USER_LOGIN',
          payload: res
        });
      }).catch((err) => { throw err; });
  }
}

export function signUp(user) {
  return (dispatch) => {
    return Firebase.auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        return dispatch({
          type: 'USER_SIGNUP',
          payload: res
        });
      }).catch((err) => { throw err; });
  }
}
