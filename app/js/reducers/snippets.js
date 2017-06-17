const initialState = () => {
  const snippets = localStorage.getItem('snippets');

  return snippets ? JSON.parse(snippets) : [];
}

export default function snippets(state = initialState(), action) {
  switch (action.type) {
    case 'SNIPPET_ADD':
      return state.concat(action.payload);

    case 'SNIPPET_DELETE':
      return state.filter(snippet =>
        snippet.id !== action.payload
      );
  }

  return state;
}
