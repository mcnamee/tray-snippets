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
    case 'REPLACE_FOLDERS':
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

export function getFolders() {
  return (dispatch) => {
    const UID = currentFirebaseUser()
    if (!UID) return false;

    return Firebase.database().ref()
      .child(`folders/${UID}`).on('value', (snapshot) => {
        const folders = snapshot.val() || [];

        return dispatch({
          type: 'REPLACE_FOLDERS',
          data: folders,
        })
      })
  }
}

export function addFolder(formData = {}) {
  return (dispatch) => {
    const UID = currentFirebaseUser()
    if (!UID) return false;

    const newKey = Firebase.database().ref()
      .child(`folders/${UID}`).push().key

    return Firebase.database().ref()
      .child(`folders/${UID}/${newKey}`).set({
        title: formData.title,
        added: Firebase.database.ServerValue.TIMESTAMP,
      }).then(() => newKey)
  }
}

export function updateFolder(folderId, formData = {}) {
  return (dispatch) => {
    if (!folderId) return false;

    const UID = currentFirebaseUser()
    if (!UID) return false;

    return Firebase.database().ref()
      .child(`folders/${UID}/${folderId}`).update({
        title: formData.title,
        updated: Firebase.database.ServerValue.TIMESTAMP,
      })
  }
}

export function deleteFolder(folderId) {
  return (dispatch) => {
    if (!folderId) return false;

    const UID = currentFirebaseUser()
    if (!UID) return false;

    return Firebase.database().ref()
      .child(`folders/${UID}/${folderId}`).set(null);
  }
}
