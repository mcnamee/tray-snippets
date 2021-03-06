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
function currentFirebaseUser() {
  if (Firebase.auth().currentUser && Firebase.auth().currentUser.uid) {
    return Firebase.auth().currentUser.uid;
  }

  return null;
}

export function getSnippets() {
  return (dispatch) => {
    const UID = currentFirebaseUser()
    if (!UID) return false;

    return Firebase.database().ref()
      .child(`snippets/${UID}`).on('value', (snapshot) => {
        const snippets = snapshot.val() || [];

        return dispatch({
          type: 'REPLACE_SNIPPETS',
          data: snippets,
        })
      })
  }
}

export function addSnippet(formData = {}) {
  return (dispatch) => {
    const UID = currentFirebaseUser()
    if (!UID) return false;

    const newKey = Firebase.database().ref()
      .child(`snippets/${UID}`).push().key

    return Firebase.database().ref()
      .child(`snippets/${UID}/${newKey}`).set({
        title: formData.title,
        text: formData.text,
        added: Firebase.database.ServerValue.TIMESTAMP,
      }).then(() => newKey)
  }
}

export function updateSnippet(snippetId, formData = {}) {
  return (dispatch) => {
    if (!snippetId) return false;

    const UID = currentFirebaseUser()
    if (!UID) return false;

    return Firebase.database().ref()
      .child(`snippets/${UID}/${snippetId}`).update({
        title: formData.title,
        text: formData.text,
        updated: Firebase.database.ServerValue.TIMESTAMP,
      })
  }
}

export function deleteSnippet(snippetId) {
  return (dispatch) => {
    if (!snippetId) return false;

    const UID = currentFirebaseUser()
    if (!UID) return false;

    return Firebase.database().ref()
      .child(`snippets/${UID}/${snippetId}`).set(null);
  }
}
