export function addSnippet(snippet) {
  return {
    type: 'SNIPPET_ADD',
    payload: snippet
  };
}

export function deleteSnippet(id) {
  return {
    type: 'SNIPPET_DELETE',
    payload: id
  }
}
