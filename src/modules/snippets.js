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
    case 'REPLACE_SNIPPETS':
      return action.data

    default:
      return state
  }
}

/**
 * Actions =============================================
 */
export function getSnippets() {
  return (dispatch) => {
    const UID = (Firebase.auth().currentUser && Firebase.auth().currentUser.uid)
      ? Firebase.auth().currentUser.uid
      : null;
    if (!UID) return false;

    const ref = Firebase.database().ref().child(`snippets/${UID}`);

    return ref.on('value', (snapshot) => {
      const snippets = snapshot.val() || [];

      return dispatch({
        type: 'REPLACE_SNIPPETS',
        data: snippets,
      });
    });
  }
}

export function addSnippet(formData = {}) {
  return (dispatch) => {
    const UID = Firebase.auth().currentUser.uid;
    if (!UID) return false;

    Firebase.database().ref().child(`snippets/${UID}`).push({
      title: formData.title,
      text: formData.text,
      added: Firebase.database.ServerValue.TIMESTAMP,
    });
  }
}
