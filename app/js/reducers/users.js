const initialState = () => {
  const user = localStorage.getItem('user');

  return user ? JSON.parse(user) : [];
}

export default function users(state = initialState(), action) {
  switch (action.type) {
    case 'USER_LOGIN':
      return state.concat(action.payload);

    case 'USER_SIGNUP':
      return state.concat(action.payload);
  }

  return state;
}
