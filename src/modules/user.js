import Firebase from '../firebase'

/**
 * Store =============================================
 */
const initialState = {}

/**
 * Reducers =============================================
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return action.data

    case 'USER_SIGNUP':
      return action.data

    case 'USER_LOGOUT':
      return {
        ...initialState,
      }

    default:
      return state
  }
}

/**
 * Actions =============================================
 */
function saveCredentialsToLocalStorage(email, password) {
  localStorage.setItem('email', email)
  localStorage.setItem('password', password)
}

export function getCredentialsFromLocalStorage() {
  const creds = {
    email: localStorage.getItem('email'),
    password: localStorage.getItem('password'),
  }

  if (creds) return creds
  return null
}

function removeCredentialsFromLocalStorage() {
  localStorage.removeItem('email');
  localStorage.removeItem('password');
}

export function login(user) {
  return async (dispatch) => {
    // Get details from local storage if empty
    if (!user || !user.email || !user.password) {
      user = getCredentialsFromLocalStorage();

      if (!user || !user.email || !user.password) {
        throw { error: { message: 'No Details' } }
      }
    }

    return Firebase.auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        saveCredentialsToLocalStorage(user.email, user.password);

        return dispatch({
          type: 'USER_LOGIN',
          data: res
        })
      }).catch((err) => { throw err; })
    }
}

 export function signUp(user) {
   return (dispatch) => {
     return Firebase.auth()
       .createUserWithEmailAndPassword(user.email, user.password)
       .then((res) => {
         return dispatch({
           type: 'USER_SIGNUP',
           data: res
         })
       }).catch((err) => { throw err; })
   }
 }
